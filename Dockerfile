FROM mhart/alpine-node:8.9.3

RUN apk add --no-cache make gcc g++ python git mysql-client

RUN mkdir -p /var/app/dist /var/app/logs
WORKDIR /var/app

COPY package.json /var/app/
RUN npm install

COPY . /var/app

CMD ["npm", "start"]

EXPOSE 9000