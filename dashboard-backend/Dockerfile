FROM node:latest

COPY package.json /data/
WORKDIR /data/
RUN npm install
ENV PATH /data/node_modules/.bin:$PATH

COPY . /data/app/
WORKDIR /data/app/

# start app
CMD ["npm", "start"]
