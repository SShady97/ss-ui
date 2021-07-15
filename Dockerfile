# get the base node image
FROM node:alpine

# set the working dir for container
WORKDIR '/frontend'

# copy the json file first
COPY package.json .

# install npm dependencies
RUN npm install

RUN chown -R node.node /frontend

# copy other project files

COPY . .

# build the folder
CMD [ "npm", "run", "start" ]