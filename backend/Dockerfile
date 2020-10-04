FROM node:12.18.4

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]