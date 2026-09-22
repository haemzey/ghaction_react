FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/notification-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/notification-service/server.cjs ./

EXPOSE 3108

CMD ["node", "server.cjs"]