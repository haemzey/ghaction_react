FROM node:24-alpine AS builder 

WORKDIR /myapp

COPY package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund

COPY src/ ./

COPY index.html ./

RUN npm run build 

FROM node:24-alpine AS runtime

RUN groupadd --system --gid 1001 appuser \
    && useradd --system --uid 1001 --gid appuser appuser

COPY --from=builder /myapp/dist ./

COPY --chown=root:root --chmod=0444 frontend-server.cjs ./

EXPOSE 4173

USER appuser

CMD ["node", "frontend-server.cjs"]