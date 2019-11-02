FROM tarampampam/node:alpine as build
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
WORKDIR /app
RUN yarn
COPY . /app
RUN yarn build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 5000