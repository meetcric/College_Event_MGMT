FROM node:16
WORKDIR /client
COPY package.json /client
RUN npm i
COPY . /client
CMD ["npm", "start"]
