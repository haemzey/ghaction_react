FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/kitchen-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY services/create-service.cjs ./

COPY services/kitchen-service/server.cjs ./

EXPOSE 3105

CMD ["node", "server.cjs"]