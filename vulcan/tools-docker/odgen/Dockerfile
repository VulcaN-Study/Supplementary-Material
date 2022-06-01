FROM ubuntu:latest

WORKDIR /app
COPY ./odgen.sh /app
RUN chmod +x /app/odgen.sh

ENV TZ=Europe/Lisbon
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && apt-get -y install sudo git bc

RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo

RUN git clone https://github.com/Song-Li/ODGen.git

WORKDIR /app/ODGen
RUN yes | ./ubuntu_setup.sh
RUN yes | ./install.sh

WORKDIR /app

ENTRYPOINT "/app/odgen.sh"
# CMD "bash"
