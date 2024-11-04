(function() {

  // ----------------------------------------------------------------------------- config

  var debug = false

  // ----------------------------------------------------------------------------- available innertube clients

  var INNERTUBE_CLIENTS = {
    'web': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'WEB',
                'clientVersion': '2.20240726.00.00',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 1,
        'REQUIRE_PO_TOKEN': true,
    },
    'web_safari': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'WEB',
                'clientVersion': '2.20240726.00.00',
                'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15,gzip(gfe)',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 1,
        'REQUIRE_PO_TOKEN': true,
    },
    'web_embedded': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'WEB_EMBEDDED_PLAYER',
                'clientVersion': '1.20240723.01.00',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 56,
    },
    'web_music': {
        'INNERTUBE_HOST': 'music.youtube.com',
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'WEB_REMIX',
                'clientVersion': '1.20240724.00.00',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 67,
    },
    'web_creator': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'WEB_CREATOR',
                'clientVersion': '1.20240723.03.00',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 62,
    },
    'android': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'ANDROID',
                'clientVersion': '19.29.37',
                'androidSdkVersion': 30,
                'userAgent': 'com.google.android.youtube/19.29.37 (Linux; U; Android 11) gzip',
                'osName': 'Android',
                'osVersion': '11',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 3,
        'REQUIRE_JS_PLAYER': false,
        'REQUIRE_PO_TOKEN': true,
    },
    'android_music': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'ANDROID_MUSIC',
                'clientVersion': '7.11.50',
                'androidSdkVersion': 30,
                'userAgent': 'com.google.android.apps.youtube.music/7.11.50 (Linux; U; Android 11) gzip',
                'osName': 'Android',
                'osVersion': '11',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 21,
        'REQUIRE_JS_PLAYER': false,
        'REQUIRE_PO_TOKEN': true,
    },
    'android_creator': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'ANDROID_CREATOR',
                'clientVersion': '24.30.100',
                'androidSdkVersion': 30,
                'userAgent': 'com.google.android.apps.youtube.creator/24.30.100 (Linux; U; Android 11) gzip',
                'osName': 'Android',
                'osVersion': '11',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 14,
        'REQUIRE_JS_PLAYER': false,
        'REQUIRE_PO_TOKEN': true,
    },
    'android_vr': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'ANDROID_VR',
                'clientVersion': '1.57.29',
                'deviceMake': 'Oculus',
                'deviceModel': 'Quest 3',
                'androidSdkVersion': 32,
                'userAgent': 'com.google.android.apps.youtube.vr.oculus/1.57.29 (Linux; U; Android 12L; eureka-user Build/SQ3A.220605.009.A1) gzip',
                'osName': 'Android',
                'osVersion': '12L',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 28,
        'REQUIRE_JS_PLAYER': false,
    },
    'android_testsuite': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'ANDROID_TESTSUITE',
                'clientVersion': '1.9',
                'androidSdkVersion': 30,
                'userAgent': 'com.google.android.youtube/1.9 (Linux; U; Android 11) gzip',
                'osName': 'Android',
                'osVersion': '11',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 30,
        'REQUIRE_JS_PLAYER': false,
        'PLAYER_PARAMS': '2AMB',
    },
    'ios': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'IOS',
                'clientVersion': '19.29.1',
                'deviceMake': 'Apple',
                'deviceModel': 'iPhone16,2',
                'userAgent': 'com.google.ios.youtube/19.29.1 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)',
                'osName': 'iPhone',
                'osVersion': '17.5.1.21F90',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 5,
        'REQUIRE_JS_PLAYER': false,
    },
    'ios_music': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'IOS_MUSIC',
                'clientVersion': '7.08.2',
                'deviceMake': 'Apple',
                'deviceModel': 'iPhone16,2',
                'userAgent': 'com.google.ios.youtubemusic/7.08.2 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)',
                'osName': 'iPhone',
                'osVersion': '17.5.1.21F90',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 26,
        'REQUIRE_JS_PLAYER': false,
    },
    'ios_creator': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'IOS_CREATOR',
                'clientVersion': '24.30.100',
                'deviceMake': 'Apple',
                'deviceModel': 'iPhone16,2',
                'userAgent': 'com.google.ios.ytcreator/24.30.100 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)',
                'osName': 'iPhone',
                'osVersion': '17.5.1.21F90',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 15,
        'REQUIRE_JS_PLAYER': false,
    },
    'mweb': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'MWEB',
                'clientVersion': '2.20240726.01.00',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 2,
    },
    'tv': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'TVHTML5',
                'clientVersion': '7.20240724.13.00',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 7,
    },
    'tv_embedded': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'TVHTML5_SIMPLY_EMBEDDED_PLAYER',
                'clientVersion': '2.0',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 85,
    },
    'mediaconnect': {
        'INNERTUBE_CONTEXT': {
            'client': {
                'clientName': 'MEDIA_CONNECT_FRONTEND',
                'clientVersion': '0.1',
            },
        },
        'INNERTUBE_CONTEXT_CLIENT_NAME': 95,
        'REQUIRE_JS_PLAYER': false,
    },
}

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
