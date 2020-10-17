CREATE USER 'node'@'%' IDENTIFIED WITH mysql_native_password BY 'pass';
GRANT ALL PRIVILEGES ON Weather.* TO 'node'@'%';
FLUSH PRIVILEGES;
