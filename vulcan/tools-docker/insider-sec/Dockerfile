FROM alpine:3.7

WORKDIR /app

COPY ./insidersec.sh /app

RUN apk add --no-cache bash
RUN apk add --no-cache tar
RUN apk add --no-cache wget
RUN apk add --no-cache bc

RUN wget https://github.com/insidersec/insider/releases/download/2.0.5/insider_2.0.5_linux_x86_64.tar.gz
RUN tar -xvf insider_2.0.5_linux_x86_64.tar.gz

RUN ln -s /app/insider /bin/insider

CMD "/app/insidersec.sh"
