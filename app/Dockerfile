FROM node:14.2.0-slim

WORKDIR /usr/src/app

COPY package.json .

COPY package-lock.json .

RUN npm install
RUN npm install -g db-migrate
RUN db-migrate up initialize
RUN npx sequelize-cli db:seed:all

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]

