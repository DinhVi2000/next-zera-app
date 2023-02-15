#FROM node:12.16.1 as builder
FROM node:16 as builder
#FROM node:12-alpine as builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

# Bundle app source
COPY . .
ARG NODE_ENV

RUN npm run build:$NODE_ENV

CMD [ "npm", "start"]
