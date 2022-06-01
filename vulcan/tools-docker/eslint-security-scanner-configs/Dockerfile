FROM node:latest

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app
COPY ./eslintssc.sh /app

RUN apt-get update
RUN apt-get install bc -y

RUN npm i -g eslint eslint-plugin-standard eslint-plugin-import \
    eslint-plugin-node eslint-plugin-promise eslint-config-standard \
    eslint-config-semistandard eslint-plugin-scanjs-rules eslint-plugin-no-unsanitized \
    eslint-plugin-prototype-pollution-security-rules eslint-plugin-angularjs-security-rules \
    eslint-plugin-react eslint-plugin-security eslint-plugin-no-wildcard-postmessage

RUN npm install eslint-plugin-html@latest --save-dev
RUN npm install eslint-plugin-scanjs-rules@latest --save-dev
RUN npm install eslint-plugin-no-unsanitized@latest --save-dev
RUN npm install eslint-plugin-prototype-pollution-security-rules@latest --save-dev
RUN npm install eslint-plugin-security@latest --save-dev
RUN npm install eslint-plugin-no-wildcard-postmessage@latest --save-dev
RUN npm install eslint-plugin-angularjs-security-rules@latest --save-dev
RUN npm install eslint-config-airbnb
RUN npm install eslint-plugin-react@latest --save-dev
RUN npm install babel-eslint --save-dev

RUN git clone https://github.com/Greenwolf/eslint-security-scanner-configs

ENTRYPOINT [ "/app/eslintssc.sh" ]
