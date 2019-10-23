FROM node:8

run yarn config set registry https://registry.npm.taobao.org --global \
    && yarn config set disturl https://npm.taobao.org/dist --global

COPY . /node-http

WORKDIR /node-http

RUN rm -rf node_modules && yarn install

EXPOSE 3000

CMD node app.js