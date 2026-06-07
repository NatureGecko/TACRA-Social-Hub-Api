FROM node:24-slim AS builder
WORKDIR /app
COPY service/package.json service/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY service/ .
RUN yarn build

FROM node:24-slim AS deployer
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 8080
CMD ["node", "dist/src/main"]
