(function() {

  // ----------------------------------------------------------------------------- config

  var debug = false

  // ----------------------------------------------------------------------------- available innertube clients

  var INNERTUBE_CLIENTS = {{INNERTUBE_CLIENTS}}

  // ----------------------------------------------------------------------------- helpers (xhr)

  var serialize_xhr_body_object = function(data) {
    if (typeof data === 'string')
      return data

    if (!(data instanceof Object))
      return null

    var body = []
    var keys = Object.keys(data)
    var key, val
    for (var i=0; i < keys.length; i++) {
      key = keys[i]
      val = data[key]
      val = encodeURIComponent(val)

      body.push(key + '=' + val)
    }
    body = body.join('&')
    return body
  }

  var download_text = function(url, headers, data, callback) {
    if (data) {
      if (!headers)
        headers = {}
      if (!headers['content-type'])
        headers['content-type'] = 'application/x-www-form-urlencoded'

      switch(headers['content-type'].toLowerCase()) {
        case 'application/json':
          data = JSON.stringify(data)
          break

        case 'application/x-www-form-urlencoded':
        default:
          data = serialize_xhr_body_object(data)
          break
      }
    }

    var xhr    = new XMLHttpRequest()
    var method = data ? 'POST' : 'GET'

    xhr.open(method, url, true, null, null)

    if (headers && (typeof headers === 'object')) {
      var keys = Object.keys(headers)
      var key, val
      for (var i=0; i < keys.length; i++) {
        key = keys[i]
        val = headers[key]
        xhr.setRequestHeader(key, val)
      }
    }

    xhr.onload = function(e) {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200) && (xhr.status < 300)) {
          callback(null, xhr.responseText)
        }
        else {
          callback(new Error('XHR response status: ' + xhr.status))
        }
      }
    }

    xhr.onerror = function(e) {
      callback(new Error('XHR error'))
    }

    if (data)
      xhr.send(data)
    else
      xhr.send()
  }

  var download_json = function(url, headers, data, callback) {
    if (!headers)
      headers = {}
    if (!headers.accept)
      headers.accept = 'application/json'

    download_text(url, headers, data, function(error, text){
      try {
        if (error) throw error

        callback(null, JSON.parse(text))
      }
      catch(e) {
        callback(e)
      }
    })
  }

  // -----------------------------------------------------------------------------
  // https://github.com/fent/node-ytdl-core/blob/master/lib/url-utils.js

  var regexs = {
    validQueryDomains: /^https?:\/\/(?:(?:www|m|music|gaming)\.)?youtube\.com\/.*[\?&]v=([^&]+).*$/,
    validPathDomains: /^https?:\/\/(?:youtu\.be|(?:www\.)?youtube\.com\/(?:embed|v|shorts))\/([^\/]+).*$/,
    videoId: /^[a-zA-Z0-9-_]{11}$/
  }

  var validateID = function(videoId) {
    return regexs.videoId.test(videoId)
  }

  var getURLVideoID = function(url) {
    var videoId, matches

    if (!videoId) {
      matches = regexs.validQueryDomains.exec(url)
      if (matches)
        videoId = matches[1]
    }

    if (!videoId) {
      matches = regexs.validPathDomains.exec(url)
      if (matches)
        videoId = matches[1]
    }

    if (!videoId) {
      throw new Error('No video id found in URL: ' + url)
    }

    videoId = videoId.trim().substring(0, 11)
    if (!validateID(videoId)) {
      throw new Error('Video id does not match expected format: ' + videoId)
    }

    return videoId
  }

  var getVideoID = function(str) {
    return validateID(str)
      ? str
      : getURLVideoID(str)
  }

  var getInfo = function(str, client, callback) {
    try {
      var videoId = getVideoID(str)

      if (!client)
        throw new Error('Invalid input: "client" is required.')
      if (!INNERTUBE_CLIENTS[client])
        throw new Error('Invalid input: specified "client" is not supported.')

      client = INNERTUBE_CLIENTS[client]

      // hard-coded from https://github.com/yt-dlp/yt-dlp/blob/master/yt_dlp/extractor/youtube.py
      var apiKey = 'AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc'
      var url, headers, data

      url = 'https://www.youtube.com/youtubei/v1/player?key=' + apiKey + '&prettyPrint=false'
      headers = {
        'origin': 'https://www.youtube.com',
        'content-type': 'application/json'
      }
      if (client['INNERTUBE_CONTEXT_CLIENT_NAME'])
        headers['X-YouTube-Client-Name'] = String(client['INNERTUBE_CONTEXT_CLIENT_NAME'])
      if (client['INNERTUBE_CONTEXT']['client']['clientVersion'])
        headers['X-YouTube-Client-Version'] = client['INNERTUBE_CONTEXT']['client']['clientVersion']
      if (client['INNERTUBE_CONTEXT']['client']['userAgent'])
        headers['User-Agent'] = client['INNERTUBE_CONTEXT']['client']['userAgent']

      data = {
        context: {
          client: {
            hl: 'en',
            timeZone: 'UTC',
            utcOffsetMinutes: 0
          }
        },
        videoId,
        playbackContext: { contentPlaybackContext: { html5Preference: 'HTML5_PREF_WANTS' } },
        contentCheckOk: true,
        racyCheckOk: true
      }
      Object.assign(data.context.client, client['INNERTUBE_CONTEXT']['client'])

      if (debug)
        console.log({url, headers, data})

      download_json(url, headers, data, callback)
    }
    catch(error) {
      callback(error)
    }
  }

  // ----------------------------------------------------------------------------- public API

  var ytdl = {}

  ytdl.clients = Object.keys(INNERTUBE_CLIENTS)

  ytdl.getInfo = getInfo

  window.ytdl = ytdl

})()
