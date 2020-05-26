FROM node:lts

WORKDIR /home/node/app
COPY *.json /home/node/app/
RUN rm -rf node_modules
RUN npm install

CMD npm start
EXPOSE 9000
