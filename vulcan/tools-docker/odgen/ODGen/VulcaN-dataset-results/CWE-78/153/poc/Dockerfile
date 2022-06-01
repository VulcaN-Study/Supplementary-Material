FROM node:10-jessie

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install wget -y
RUN wget https://registry.npmjs.org/dns-sync/-/dns-sync-0.1.0.tgz 
RUN tar -xvf dns-sync-0.1.0.tgz
COPY ./poc /test-dns

WORKDIR /test-dns
RUN npm cache clean --force
RUN npm install --save bcrypt-nodejs && npm uninstall --save bcrypt
RUN npm i ../package
ENTRYPOINT ["node", "index.js"]