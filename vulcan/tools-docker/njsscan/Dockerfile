FROM python:3.8-slim-buster

WORKDIR /app
COPY ./njsscan.sh /app
RUN chmod +x /app/njsscan.sh

RUN apt-get update
RUN apt-get install bc -y

RUN pip install njsscan==0.2.8

ENTRYPOINT "/app/njsscan.sh"
