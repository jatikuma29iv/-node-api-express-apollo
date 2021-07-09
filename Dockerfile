
# Stage 1: base images
FROM rhel8/nodejs-12:latest as base

COPY package.json .

RUN npm i


FROM base as dev

RUN npm install -g nodemon

COPY . .

CMD ["nodemon"]

# Stage production
#FROM npm-install
#
#RUN npm install -g pm2
#
#COPY . .
#
#CMD ["pm2-runtime", "src/app.js"]

