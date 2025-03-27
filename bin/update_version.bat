@echo off

set new_version=4.16.5

cd /D "%~dp0.."

call node -e "const fs = require('fs'); const pkg = require('./package.json'); pkg.dependencies['@distube/ytdl-core'] = '%new_version%'; pkg.version = '%new_version%-distubejs.1'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), {encoding: 'utf8', flush: true});"

call npm install

if exist dist rmdir /Q /S dist

call npm run build:es2020
call npm run build:es5

echo.
pause
