FROM node:24-alpine

RUN apk add --no-cache curl

WORKDIR /tests

COPY integration-test.sh .

RUN chmod +x integration-test.sh

ENTRYPOINT ["./integration-test.sh"]
