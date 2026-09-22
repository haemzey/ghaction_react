FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/order-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/order-service/server.cjs ./

EXPOSE 3102

CMD ["node", "server.cjs"]