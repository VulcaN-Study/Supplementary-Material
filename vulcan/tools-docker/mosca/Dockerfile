FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app
COPY ./mosca.sh /app

RUN chmod +x /app/mosca.sh

# Update image
RUN apt-get update -y 

# Install dependencies for Mosca
RUN apt-get install build-essential libpcre3-dev git bc -y

# Clone Mosca Repo
RUN git clone --depth 1 --branch 0.8 https://github.com/CoolerVoid/Mosca.git

WORKDIR /app/Mosca/
RUN make

RUN ln -s /app/Mosca/mosca /bin/mosca

WORKDIR /app

ENTRYPOINT [ "/app/mosca.sh" ]
