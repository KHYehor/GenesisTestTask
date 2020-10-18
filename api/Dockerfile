FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

# Intsall dependencies
RUN yarn install
# Install typescript compiler and nest cli
RUN yarn global add typescript @nestjs/cli typeorm
# Apply all migrations
RUN yarn run typeorm migration:run
#Loading data to db
RUN node src/script/LoadData.js
# Start project via script
ENTRYPOINT yarn run start
