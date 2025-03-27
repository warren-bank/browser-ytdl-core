@echo off

set new_version=4.16.5
set new_commit=f56b052cd5055390df789f178911af9eeff03124

rem :: first 7 hex digits
set new_commit_short=%new_commit:~0,7%

cd /D "%~dp0.."

call node -e "const fs = require('fs'); const pkg = require('./package.json'); pkg.dependencies['@distube/ytdl-core'] = 'github:Neder11ndeu/yt-donglot#%new_commit%'; pkg.version = '%new_version%-neder11ndeu-%new_commit_short%.1'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), {encoding: 'utf8', flush: true});"

call npm install

if exist dist rmdir /Q /S dist

call npm run build:es2020
call npm run build:es5

echo.
pause
