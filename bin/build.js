const fs    = require('fs')
const path  = require('path')
const https = require('https')
const {EOL} = require('os')

const version         = require('../package.json').version.split('-yt-dlp')[0]
const input_url       = 'https://raw.githubusercontent.com/yt-dlp/yt-dlp/' + version + '/yt_dlp/extractor/youtube.py'
const input_filepath  = path.resolve(__dirname, '../src/ytdl-core.js')
const output_filepath = path.resolve(__dirname, '../dist/ytdl-core.js')
const debug           = true

fs.rmSync(output_filepath, {force: true})

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

if (debug) console.log('starting download:', input_url)

const req = https.request(input_url, (res) => {
  res.setEncoding('utf8')

  if (debug) console.log('received status code', res.statusCode)

  let chunks = []
  res.on('data', (chunk) => {
    chunks.push(chunk)
    if (debug) console.log('received chunk of download data: #' + chunks.length)
  })

  res.on('end', () => {
    if (debug) console.log('completed download')
    if (debug) console.log('starting script update')

    let script = chunks.join('')
    chunks = null

    let needle, index

    needle = "\nINNERTUBE_CLIENTS = {"
    index = script.indexOf(needle)
    if (index === -1)  {
      console.log('Error: youtube.py extractor does not contain the expected data structure.')
      process.exit(1)
    }
    script = script.substring(index + (needle.length - 1), script.length)

    needle = "\n}"
    index = script.indexOf(needle)
    if (index === -1)  {
      console.log('Error: youtube.py extractor does not contain the expected data structure.')
      process.exit(1)
    }
    script = script.substring(0, index + needle.length)

    // remove Python comments
    script = script.replace(/^\s*#.*$/gm, '')

    // reformat boolean literals
    script = script.replaceAll('True',  'true')
    script = script.replaceAll('False', 'false')

    // cleanup whitespace
    script = script.replace(/(?:\r?\n)+/g, EOL)

    let src = fs.readFileSync(input_filepath, {encoding: 'utf8'})
    script = src.replace('{{INNERTUBE_CLIENTS}}', script)
    src = null

    if (debug) console.log('completed script update')
    if (debug) console.log('starting script output:', output_filepath)

    fs.writeFileSync(output_filepath, script, {encoding: 'utf8'})
    if (debug) console.log('completed script output')
  })
})

req.on('error', (error) => {
  console.log('Error: ' + error.message)
  process.exit(2)
})

req.end()
