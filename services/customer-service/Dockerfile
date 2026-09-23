FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/customer-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/customer-service/server.cjs ./

EXPOSE 3104

CMD ["node", "server.cjs"]