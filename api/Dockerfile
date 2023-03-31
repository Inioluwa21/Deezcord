ARG NODE_VERSION=19-alpine3.16

FROM node:${NODE_VERSION}

EXPOSE 8000

RUN apk update && apk add bash

WORKDIR /usr/src/app

COPY *.json .

COPY server.js .

RUN npm install

CMD ["npm", "start"]