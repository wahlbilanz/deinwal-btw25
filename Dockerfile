FROM node:20 AS donator
COPY . /data
WORKDIR /data
RUN node --version && npm ci --force
RUN npm run lint
RUN npm run build
RUN pwd
RUN ls -alh
RUN find dist

FROM nginx
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=donator /data/dist/deinwal-btw25 /usr/share/nginx/html
RUN find /usr/share/nginx/html
