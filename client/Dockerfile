FROM node:20 AS builder
WORKDIR /app
COPY ["./", "./"]
RUN yarn install --immutable --inline-builds
RUN yarn build


FROM node:20-alpine
WORKDIR /app
EXPOSE 3000/tcp

ENTRYPOINT [ "/etc/entrypoint.sh" ]
COPY ./entrypoint.sh /etc/entrypoint.sh
RUN chmod +x /etc/entrypoint.sh

COPY --from=builder ["/app/.output", "./"]
