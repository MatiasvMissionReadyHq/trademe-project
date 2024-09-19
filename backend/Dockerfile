FROM node:22-alpine

WORKDIR /backend

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]