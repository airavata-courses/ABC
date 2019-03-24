FROM node:8.15.1-slim

COPY . /opt/app
WORKDIR /opt/app/web-ui

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]

