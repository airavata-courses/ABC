FROM node:8.15.1-slim

COPY . /opt/app
WORKDIR /opt/app

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
