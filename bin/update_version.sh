#!/usr/bin/env bash

new_version='4.16.5'
new_commit='f56b052cd5055390df789f178911af9eeff03124'

# first 7 hex digits
new_commit_short="${new_commit:0:7}"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}/.."

node -e "const fs = require('fs'); const pkg = require('./package.json'); pkg.dependencies['@distube/ytdl-core'] = 'github:Neder11ndeu/yt-donglot#${new_commit}'; pkg.version = '${new_version}-neder11ndeu-${new_commit_short}.1'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), {encoding: 'utf8', flush: true});"

npm install

[ -d 'dist' ] && rm -rf dist

npm run build:es2020
npm run build:es5
