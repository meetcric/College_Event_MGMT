FROM node:18.0.0-alpine3.14
WORKDIR /client
COPY package.json /client
RUN npm i
COPY . /client
CMD ["npm", "start"]
