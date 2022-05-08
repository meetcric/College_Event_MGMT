FROM node:16
WORKDIR /client
COPY package.json /client
RUN npm i
COPY . /client
CMD ["npm", "start"]

# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY ./build .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]