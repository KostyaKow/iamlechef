#!/bin/bash

if [[ "`uname`" != 'Linux' ]]; then
   echo "error: this script only works for Linux"
fi 

if [[ "`ps -e | grep nginx`"  == "" ]]; then
   cp app/src/misc/nginx.conf /etc/nginx/nginx.conf
   nginx &
fi

rm /usr/share/nginx/html/*
cp -R app/src/html/* /usr/share/nginx/html
cp -R app/src/userjs/* /usr/share/nginx/html
node app/src/serverjs/index.js
