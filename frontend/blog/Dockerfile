FROM node as build

WORKDIR /blog
COPY package.json ./
COPY package-lock.json ./
RUN npm i --force
COPY . .
RUN npm run build
CMD ["npm","run","start"]

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /blog/build /usr/share/nginx/html


