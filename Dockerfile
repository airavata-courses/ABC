FROM node:latest

COPY . /opt/app
WORKDIR /opt/app/EmailService

EXPOSE 3002

RUN npm install

ENTRYPOINT ["npm", "start"]

