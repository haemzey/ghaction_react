FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/promotion-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/promotion-service/server.cjs ./

EXPOSE 3110

CMD ["node", "server.cjs"]