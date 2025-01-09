FROM node:latest

WORKDIR /usr/apps/todo-service

COPY ./  ./

RUN npm run install-all