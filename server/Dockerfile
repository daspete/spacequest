FROM node:20-alpine
WORKDIR /app
EXPOSE 3000/tcp

ENTRYPOINT [ "/etc/entrypoint.sh" ]
COPY ./entrypoint.sh /etc/entrypoint.sh
RUN chmod +x /etc/entrypoint.sh

COPY ["./package.json", "./package-lock.json", "./"]
RUN npm install --immutable --inline-builds

COPY ["./", "./"]
RUN yarn build
