const fs    = require('fs')
const path  = require('path')
const https = require('https')

const version         = require('../package.json').version.split('-ybd-project')[0]
const input_url       = 'https://cdn.jsdelivr.net/npm/@ybd-project/ytdl-core@' + version + '/bundle/browser.min.js'
const output_filepath = path.resolve(__dirname, '../dist/es2020/ytdl-core.js')
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

    let search, replace

    // convert library from ESM export to global variable
    search  = ';export default'
    replace = ';window.Ytdl ='
    if (script.indexOf(search) === -1) {
      console.log('Error: script does not contain the expected ESM export.')
      process.exit(1)
    }
    script = script.replace(search, replace)

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
