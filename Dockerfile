FROM node:latest

COPY . /opt/app
WORKDIR /opt/app

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
