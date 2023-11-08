FROM node:18-alpine

WORKDIR /mini-linkedin/frontend

COPY package*.json .

RUN npm install -g nodemon --verbose

RUN npm i --verbose

COPY . .

CMD ["npm", "run", "start"]