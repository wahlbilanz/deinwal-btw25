FROM node:20-alpine AS donator
COPY . /data
WORKDIR /data
RUN node --version && npm ci --force
RUN npm run lint
RUN npm run build

FROM node:20-alpine
RUN mkdir /app
WORKDIR /app
COPY --from=donator /data/dist/deinwal-btw25 /app
CMD node server/server.mjs
