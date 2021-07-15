FROM node:alpine

WORKDIR '/frontend'

COPY package.json .

RUN npm install

RUN chown -R node.node /frontend

COPY . .

CMD [ "npm", "run", "start" ]