FROM node:12.18.4


WORKDIR /icu
RUN npm init -y && npm install full-icu
ENV NODE_ICU_DATA=/icu/node_modules/full-icu

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]