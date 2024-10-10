{
  const {setMockAgent} = require('not_supported_agent')
  const utils          = require('@distube/ytdl-core/lib/utils')

  utils.applyDefaultAgent    = setMockAgent
  utils.applyOldLocalAddress = setMockAgent

  utils.saveDebugFile = n => n

  utils.request = (url, options = {}) => fetch(url, options.requestOptions).then(res => res.text())
}

window.ytdl = require('@distube/ytdl-core')
