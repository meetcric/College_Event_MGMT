FROM node:18.0.0-alpine3.14
WORKDIR /server
COPY package.json /server
RUN npm i
COPY . /server
CMD ["node", "index.js"]
