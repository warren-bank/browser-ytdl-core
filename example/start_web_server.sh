#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# https://github.com/warren-bank/node-serve
export NO_UPDATE_CHECK='1'

echo 'URLs to open in browser..'
echo ''
echo '1. Install userscript:'
echo '   http://localhost:80/example/es2020/ytdl-core.no-proxy.user.js'
echo ''
echo '2. Open any Youtube video, for example:'
echo '   https://www.youtube.com/watch?v=qhKci8jY510'
echo ''

serve --cors --listen 'tcp:0.0.0.0:80' "${DIR}/.."
