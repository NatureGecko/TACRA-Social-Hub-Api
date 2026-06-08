FROM node:24-slim AS builder
WORKDIR /app
COPY service/package.json service/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY service/ .
RUN yarn build
RUN yarn prisma generate

FROM node:24-slim AS deployer
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
EXPOSE 8080
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/src/main"]
 
