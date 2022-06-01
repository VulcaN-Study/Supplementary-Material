FROM ubuntu:latest

WORKDIR /app
COPY ./codeql.sh /app
RUN chmod +x /app/codeql.sh

RUN apt-get update
RUN apt-get install wget git unzip bc -y

RUN wget https://github.com/github/codeql-cli-binaries/releases/download/v2.2.4/codeql-linux64.zip
RUN unzip codeql-linux64.zip

RUN git clone --depth 1 --branch v1.25.0 https://github.com/github/codeql.git codeql-repo
RUN ln -s /app/codeql/codeql /bin/codeql

ENTRYPOINT "/app/codeql.sh"
