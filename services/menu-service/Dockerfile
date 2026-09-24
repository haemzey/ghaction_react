FROM node:24-alpine AS builder

WORKDIR /myapp

COPY services/menu-service/package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY server.cjs ./

EXPOSE 3101

CMD ["node", "server.cjs"]