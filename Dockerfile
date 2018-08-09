FROM node:8.9.4
EXPOSE 8080

WORKDIR /opt/easy-notes-client

COPY server.js package.json ./
COPY app ./app/

RUN npm install

CMD node server.js