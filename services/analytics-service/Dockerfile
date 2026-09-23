FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/analytics-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/analytics-service/server.cjs ./

EXPOSE 3109

CMD ["node", "server.cjs"]