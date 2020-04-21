FROM node:8.9.3-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3001

CMD ["npm", "start"]