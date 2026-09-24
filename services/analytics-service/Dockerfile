FROM node:24-alpine AS builder

WORKDIR /myapp

COPY package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY server.cjs ./

EXPOSE 3109

CMD ["node", "server.cjs"]