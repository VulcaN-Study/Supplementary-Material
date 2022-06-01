#FROM alpine:3.7
FROM ubuntu:18.04

WORKDIR /results
WORKDIR /app

COPY ./graudit.sh /app

RUN apt-get update \
    && apt-get install -y git bc\
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 --branch v2.8 https://github.com/wireghoul/graudit
RUN ln -s /app/graudit/graudit /bin/graudit

ENTRYPOINT ["/app/graudit.sh"]
