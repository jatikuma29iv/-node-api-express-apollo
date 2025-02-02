
# Stage 1: base images
FROM node:lts-alpine as base

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

# setup pm2
RUN npm install -g pm2

ADD --chown=node:node package* .

RUN npm i

ADD --chown=node:node . .

USER node

CMD ["pm2-runtime", "src/api.js"]
