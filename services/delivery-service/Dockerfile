FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/delivery-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY server.cjs ./

EXPOSE 3106

CMD ["node", "server.cjs"]