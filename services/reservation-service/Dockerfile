FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/reservation-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/reservation-service/server.cjs ./

EXPOSE 3103

CMD ["node", "server.cjs"]