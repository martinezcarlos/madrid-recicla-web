# syntax=docker/dockerfile:1
#---------------------------------------------------------
##
## Build
##
FROM node as build

ARG SERVER_URL
ARG CLOTHES_CONTAINERS_PATH
ARG MAPBOX_WEB_TOKEN

WORKDIR /usr/src/app

RUN echo "SERVER_URL=${SERVER_URL}\nCLOTHES_CONTAINERS_PATH=${CLOTHES_CONTAINERS_PATH}\nMAPBOX_WEB_TOKEN=${MAPBOX_WEB_TOKEN}" > .env

COPY package-lock.json package.json ./

RUN npm install --no-progress --ignore-optional

COPY . .

RUN npm run build:prod && rm -r .env

#---------------------------------------------------------
##
## Deploy
##

FROM nginx:latest
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'