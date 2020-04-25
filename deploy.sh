#!/bin/bash
set -xe

cd client
yarn
CI=false yarn build-sw
rsync -rq --delete --rsync-path="mkdir -p brewzer-client && rsync" \
$TRAVIS_BUILD_DIR/client/build/ travis@51.15.124.103:brewzer-client
# npm install -g pm2
# cd ../server
# pm2 deploy ecosystem.config.js production --force