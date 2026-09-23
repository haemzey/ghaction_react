FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/payment-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/payment-service/server.cjs ./

EXPOSE 3107

CMD ["node", "server.cjs"]