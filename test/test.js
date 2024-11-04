// test to run in the browser javascript console on: https://youtube.com/

(function() {

  // add support for CSP 'Trusted Type' assignment
  var add_default_trusted_type_policy = function() {
    if (typeof window.trustedTypes !== 'undefined') {
      try {
        var passthrough_policy = function(string) {return string}

        window.trustedTypes.createPolicy('default', {
            createHTML:      passthrough_policy,
            createScript:    passthrough_policy,
            createScriptURL: passthrough_policy
        })
      }
      catch(e) {}
    }
  }

  var log_console = console.log

  var log_dom = function(str) {
    var pre = document.createElement('pre')
    pre.textContent = str
    document.body.appendChild(pre)
  }

  var log = function(str) {
    log_console(str)
    log_dom(str)
  }

  var test_all_clients = function(str) {
    document.body.innerHTML = ''

    var callback, client

    callback = function(client, error, info) {
      log(('-').repeat(40))
      log('Client: ' + client)
      if (error) {
        log('Error: ' + error.message)
      }
      else {
        var formats = info.streamingData.adaptiveFormats
        log('Formats: ' + JSON.stringify(formats, null, 2))
      }
    }

    for (var i=0; i < window.ytdl.clients.length; i++) {
      client = window.ytdl.clients[i]

      window.ytdl.getInfo(str, client, callback.bind(null, client))
    }
  }

  add_default_trusted_type_policy()

  test_all_clients('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

})()
