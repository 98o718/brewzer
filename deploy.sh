#!/bin/bash
set -xe

cd client
yarn
CI=false yarn build-sw
rsync -rq --delete --rsync-path="mkdir -p brewzer-client && rsync" \
$TRAVIS_BUILD_DIR/client/build/ travis@51.15.124.103:brewzer-client