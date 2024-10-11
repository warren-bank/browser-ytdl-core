const querystring = require('querystring')

const getTLD = (url) => (new URL(url)).hostname.split('.').slice(-2).join('.').toLowerCase()

const miniget = function(url, requestOptions) {
  const req = {
    data:   null,
    onData: [],
    onEnd:  [],
    on: (name, cb) => {
      if (req.data !== null) {
        if (name === 'data')
          cb(data)
        else
          cb()
      }
      else {
        if (name === 'data')
          req.onData.push(cb)

        if (name === 'end')
          req.onEnd.push(cb)
      }
    },
    textPromise: {},
    text: () => new Promise((resolve, reject) => {
      if (req.data !== null)
        resolve(req.data)
      else
        req.textPromise = {resolve, reject}
    })
  }

  const fetchOptions = {
    method:      'GET',
    mode:        'no-cors',
    credentials: 'include',
    redirect:    'follow'
  }

  const cookies = []

  if (getTLD(window.location.href) === 'youtube.com') {
    cookies.push('SOCS=CAI')
  }

  let debug = false

  if (requestOptions instanceof Object) {
    // https://developer.mozilla.org/en-US/docs/Web/API/RequestInit

    if (requestOptions.query instanceof Object) {
      url += ((url.indexOf('?') === -1) ? '?' : '&') + querystring.stringify(requestOptions.query)
    }

    if (requestOptions.headers) {
      if (requestOptions.headers instanceof Object) {
        if (typeof requestOptions.headers.cookie !== 'undefined') {
          let cookie = requestOptions.headers.cookie.trim()
          delete requestOptions.headers.cookie

          if (cookie) {
            cookies.push(
              ...cookie.split(/\s*;\s*/g).filter(c => !!c)
            )
          }
        }
      }
      else {
        delete requestOptions.headers
      }
    }

    for (let key of ['method', 'mode', 'credentials', 'referrer', 'headers', 'body']) {
      if (requestOptions[key]) {
        fetchOptions[key] = requestOptions[key]
      }
    }

    if (requestOptions.proxyUrl)
      url = requestOptions.proxyUrl + url

    if (requestOptions.debug)
      debug = true
  }

  if (cookies.length && (getTLD(url) === getTLD(window.location.href))) {
    for (let cookie of cookies) {
      document.cookie = cookie
    }
  }

  if (debug)
    window.alert(url)

  fetch(url, fetchOptions)
  .then(response => response.text())
  .then(data => {
    if (debug)
      window.alert(data)

    req.data = data

    for (let cb of req.onData)
      cb(data)

    for (let cb of req.onEnd)
      cb()

    if (typeof req.textPromise.resolve === 'function')
      req.textPromise.resolve(data)
  })
  .catch(error => {
    if (debug)
      window.alert(error.message)

    console.log('miniget:', error, {url, fetchOptions, cookies})

    if (typeof req.textPromise.reject === 'function')
      req.textPromise.reject(error)

    throw error
  })

  return req
}

miniget.defaultOptions = {
  maxRedirects: 10,
  maxRetries: 2,
  maxReconnects: 0,
  backoff: { inc: 100, max: 10000 }
}

miniget.MinigetError = class MinigetError extends Error {}

module.exports = miniget
