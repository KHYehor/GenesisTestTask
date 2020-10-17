FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE Weather

ADD ./setup.sql /docker-entrypoint-initdb.d
