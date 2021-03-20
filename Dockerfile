FROM node:12.21.0-alpine3.10 AS compile-image

# RUN mkdir app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN node_modules/.bin/ng build --prod

FROM nginx:1.19.8-alpine
COPY --from=compile-image /app/dist/super-heroes /usr/share/ngingx/html
