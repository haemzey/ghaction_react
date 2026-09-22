# Ember Table

A restaurant operations platform built with React, Vite, Express microservices, and Nginx.

## Frontend pages

The React app includes ten functional operations pages:

- Overview dashboard
- Orders
- Kitchen display
- Reservations
- Menu studio
- Customers
- Promotions
- Analytics
- Delivery desk
- Settings

## Microservices

Each service owns one restaurant capability and lives in its own directory under `services/`:

- `menu-service` on port `3101`
- `order-service` on port `3102`
- `reservation-service` on port `3103`
- `customer-service` on port `3104`
- `kitchen-service` on port `3105`
- `delivery-service` on port `3106`
- `payment-service` on port `3107`
- `notification-service` on port `3108`
- `analytics-service` on port `3109`
- `promotion-service` on port `3110`

Each service exposes `/health`, `GET /api/<capability>`, and `POST /api/<capability>`.
Each service also owns its own `package.json` and `package-lock.json`, so it can
be installed, tested, and deployed independently from the root application.

## Development

```bash
npm install
npm run services:install
npm run services
npm run dev
```

For a single service, install only its dependencies:

```bash
npm install --prefix services/menu-service
npm --prefix services/menu-service start
```

The Vite app runs at `http://localhost:5173` and proxies API requests to the services.

## Nginx gateway stack

Nginx is a dedicated gateway only. It does not contain, mount, or serve the
React `dist` directory. The separate `frontend` container builds and serves
the React application on its private port `4173`; Nginx reverse-proxies `/` to
that frontend service and `/api/*` to the matching private microservice.

The gateway is the only public container and listens on port `8080`.

```bash
npm run docker:up
```

Open `http://localhost:8080`. Stop the stack with:

```bash
npm run docker:down
```
