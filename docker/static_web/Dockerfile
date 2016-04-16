# Version: 0.0.1
FROM ubuntu:latest
MAINTAINER miaomao1989 "miaomao1989@gmail.com"
RUN apt-get update
RUN apt-get install -y nginx
RUN echo 'Hi, I am in your container' \
	>/usr/share/nginx/html/index.html
EXPOSE 80
