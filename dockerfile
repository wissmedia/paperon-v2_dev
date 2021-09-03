FROM node:14-alpine3.14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 2021
CMD ["npm", "start"]