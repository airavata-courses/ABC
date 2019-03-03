#!/bin/sh

cd EmailService/
npm install
nohup npm start >/dev/null 2>&1 &
