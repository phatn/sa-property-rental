FROM node:16.17.0
WORKDIR /usr/src/app
COPY package*.json ./
ADD package.json /usr/src/app/package.json
RUN npm install
RUN npm install react-scripts@1.1.0 -g
COPY . .
EXPOSE 80
CMD ["npm ","start"]