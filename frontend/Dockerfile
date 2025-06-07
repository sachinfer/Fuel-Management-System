FROM node:20 as builder

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm config set registry "http://registry.npmjs.org/" && npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 