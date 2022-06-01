FROM mcr.microsoft.com/dotnet/core/sdk
ARG DEVSKIM_VERSION=0.4.109

WORKDIR /results
WORKDIR /app

COPY ./msdevskim.sh /app

RUN apt-get update
RUN apt-get install bc -y

RUN dotnet tool install --global Microsoft.CST.DevSkim.CLI --version ${DEVSKIM_VERSION} && \
    ln -s /root/.dotnet/tools/devskim /usr/bin/devskim

RUN chmod +x /app/msdevskim.sh

ENTRYPOINT "/app/msdevskim.sh"
