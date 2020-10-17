
FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

# Intsall dependencies
RUN yarn install
# Install typescript compiler and nest cli
RUN yarn global add typescript @nestjs/cli typeorm
# Start project via script
ENTRYPOINT ["node", "dist/"]
