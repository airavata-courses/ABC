FROM node:8.15.1-slim

COPY . /opt/app
WORKDIR /opt/app/EmailService

EXPOSE 3002

RUN npm install

ENTRYPOINT ["npm", "start"]

