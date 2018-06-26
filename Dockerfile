FROM node:8

ENV ROOT /elm-css-modules-loader
RUN mkdir -p $ROOT
COPY . $ROOT
WORKDIR $ROOT/example

RUN rm -rf node_modules elm-stuff
RUN yarn
RUN yarn elm-package install --yes
RUN yarn webpack
