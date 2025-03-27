#!/usr/bin/env bash

new_version='4.16.5'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${DIR}/.."

node -e "const fs = require('fs'); const pkg = require('./package.json'); pkg.dependencies['@distube/ytdl-core'] = '${new_version}'; pkg.version = '${new_version}-distubejs.1'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), {encoding: 'utf8', flush: true});"

npm install

[ -d 'dist' ] && rm -rf dist

npm run build:es2020
npm run build:es5
