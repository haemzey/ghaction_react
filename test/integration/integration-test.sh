#!/bin/bash

set -Eeuo pipefail

BASE_URL="${BASE_URL:-http://mynginx}"

CURL_TIMEOUT="${CURL_TIMEOUT:-10}"
RETRY_ATTEMPTS="${RETRY_ATTEMPTS:-30}"
RETRY_DELAY="${RETRY_DELAY:-2}"

API_ENDPOINTS=(
    "/api/menu"
    "/api/orders"
    "/api/reservations"
    "/api/customers"
    "/api/kitchen"
    "/api/delivery"
    "/api/payments"
    "/api/notifications"
    "/api/analytics"
    "/api/promotions"
)

log_info() {
    printf '[INFO] %s\n' "$*"
}

log_success() {
    printf '[PASS] %s\n' "$*"
}

log_error() {
    printf '[FAIL] %s\n' "$*" >&2
}


cleanup() {
    log_info "Integration test execution completed."
}

trap cleanup EXIT


http_status() {
    local endpoint="$1"

    curl \
        --silent \
        --show-error \
        --output /dev/null \
        --write-out '%{http_code}' \
        --max-time "$CURL_TIMEOUT" \
        "${BASE_URL}${endpoint}"
}

get_body() {
    local endpoint="$1"

    curl \
        --silent \
        --show-error \
        --fail \
        --max-time "$CURL_TIMEOUT" \
        "${BASE_URL}${endpoint}"
}

validate_json() {
    local response="$1"

    node -e '
        let data = "";

        process.stdin.on("data", chunk => {
            data += chunk;
        });

        process.stdin.on("end", () => {
            try {
                JSON.parse(data);
                process.exit(0);
            } catch (error) {
                console.error("Response is not valid JSON.");
                process.exit(1);
            }
        });
    ' <<< "$response"
}

wait_for_gateway() {
    log_info "Waiting for gateway: ${BASE_URL}"

    for attempt in $(seq 1 "$RETRY_ATTEMPTS"); do
        if curl \
            --silent \
            --show-error \
            --fail \
            --output /dev/null \
            --max-time "$CURL_TIMEOUT" \
            "${BASE_URL}/health"; then

            log_success "Gateway is reachable."

            return 0
        fi

        log_info "Gateway not ready. Attempt ${attempt}/${RETRY_ATTEMPTS}."

        sleep "$RETRY_DELAY"
    done

    log_error "Gateway did not become ready."

    return 1
}


test_gateway_health() {
    log_info "Testing gateway health endpoint..."

    local response
    response="$(get_body "/health")"

    if [[ "$response" != "ok" ]]; then
        log_error "Gateway health returned unexpected response: ${response}"
        return 1
    fi

    log_success "Gateway health check passed."
}


test_frontend() {
    log_info "Testing frontend through Nginx gateway..."

    local status

    status="$(http_status "/")"

    if [[ "$status" != "200" ]]; then
        log_error "Frontend returned HTTP ${status}."
        return 1
    fi

    log_success "Frontend proxy check passed: HTTP ${status}."
}


test_api_endpoint() {
    local endpoint="$1"

    log_info "Testing API endpoint: ${endpoint}"

    local status
    local response

    status="$(http_status "$endpoint")"

    if [[ "$status" != "200" ]]; then
        log_error "${endpoint} returned HTTP ${status}."

        # Attempt to display response for diagnostics.
        response="$(
            curl \
                --silent \
                --show-error \
                --max-time "$CURL_TIMEOUT" \
                "${BASE_URL}${endpoint}" \
                || true
        )"

        if [[ -n "$response" ]]; then
            log_error "Response: ${response}"
        fi

        return 1
    fi

    response="$(get_body "$endpoint")"

    if ! validate_json "$response"; then
        log_error "${endpoint} returned HTTP 200 but the response is not valid JSON."
        log_error "Response: ${response}"

        return 1
    fi

    log_success "${endpoint} passed: HTTP ${status}, valid JSON."
}


test_api_endpoints() {
    log_info "Testing ${#API_ENDPOINTS[@]} API gateway routes..."

    local endpoint

    for endpoint in "${API_ENDPOINTS[@]}"; do
        test_api_endpoint "$endpoint"
    done

    log_success "All API gateway routes passed."
}


main() {
    echo
    echo "============================================================"
    echo "        MICROSERVICES INTEGRATION TEST"
    echo "============================================================"
    echo
    echo "Gateway      : ${BASE_URL}"
    echo "Retry attempts: ${RETRY_ATTEMPTS}"
    echo "Retry delay  : ${RETRY_DELAY}s"
    echo
    echo "============================================================"
    echo


    wait_for_gateway

    echo


    test_gateway_health

    echo

    test_frontend

    echo

    test_api_endpoints

    echo
    echo "============================================================"
    echo "        ALL INTEGRATION TESTS PASSED"
    echo "============================================================"
    echo

    log_success "Gateway is reachable."
    log_success "Frontend is reachable through Nginx."
    log_success "All microservice API routes are reachable."
    log_success "All API responses contain valid JSON."
}

main "$@"

