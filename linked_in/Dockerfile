FROM node:18.12.0

WORKDIR /mini-linkedin/frontend

COPY package*.json .

RUN npm install -g nodemon --verbose

RUN npm i --verbose

COPY . .

CMD ["nodemon", "npm", "start"]