FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/delivery-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/delivery-service/server.cjs ./

EXPOSE 3106

CMD ["node", "server.cjs"]