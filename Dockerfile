FROM node:8.11.3 as builder

COPY package.json /home/app/package.json

WORKDIR /home/app
RUN npm install

ADD . /home/app

RUN npm run build

FROM nginx:1.17.2-alpine 

LABEL maintainer="Oscar Toledo <osky.toledo@gmail.com>"

COPY --from=builder /home/app/dist /usr/share/nginx/html
