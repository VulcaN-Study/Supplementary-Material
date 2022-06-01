FROM node:latest

WORKDIR /schema
COPY ./report-schema.json /schema

WORKDIR /file
ENV DEBIAN_FRONTEND=noninteractive

RUN npm install -g pajv

ENTRYPOINT [ "pajv" ]