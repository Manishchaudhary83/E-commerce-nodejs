FROM node:26-alpine3.23
WORKDIR /src
COPY package*.json ./
RUN npm install
# RUN npm i -g nodemon
COPY . .
EXPOSE 3006
CMD ["node", "server.js"]
