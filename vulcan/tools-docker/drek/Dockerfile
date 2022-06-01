FROM node:latest

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app
COPY ./drek.sh /app/

# Update image
RUN apt-get update -y && apt-get upgrade -y

# Install dependencies for CodeWarrior
RUN apt-get install build-essential git bc -y

# Install Drek
RUN npm install -g drek@1.0.3

# Clone repo of signatures
RUN git clone https://github.com/chrisallenlane/drek-signatures.git

RUN chmod +s /app/drek.sh

ENTRYPOINT "/app/drek.sh"
