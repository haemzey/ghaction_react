FROM node:24-alpine AS builder

WORKDIR /myapp

COPY package*.json ./

RUN npm ci --no-audit --no-fund

COPY vite.config.js index.html ./
COPY src ./src

RUN npm run build

FROM node:24-alpine AS runtime

RUN groupadd --system --gid 1001 appuser \
    && useradd --system --uid 1001 --gid appuser appuser

WORKDIR /myapp

COPY package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY --from=builder /myapp/dist ./dist

COPY --chown=root:root --chmod=0444 frontend-server.cjs .

ENV NODE_ENV=production

EXPOSE 4173

USER appuser

CMD ["node", "frontend-server.cjs"]