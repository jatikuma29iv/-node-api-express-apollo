
# Stage 1: base images
FROM node:lts-alpine as base

RUN mkdir /home/node/app && chown node:node /home/node/app

WORKDIR /home/node/app

RUN npm install -g nodemon

ADD --chown=node:node package* .

RUN npm i

ADD --chown=node:node . .

USER node

CMD ["nodemon"]

# Stage production
#FROM npm-install
#
#RUN npm install -g pm2
#
#COPY . .
#
#CMD ["pm2-runtime", "src/app.js"]

