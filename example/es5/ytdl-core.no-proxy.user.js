// ==UserScript==
// @name         browser-ytdl-core: no proxy
// @description  example: CORS restricts usage to 'youtube.com' domain
// @version      1.0.0
// @require      https://cdnjs.cloudflare.com/ajax/libs/core-js/3.33.3/minified.min.js
// @require      https://unpkg.com/whatwg-fetch@3.6.19/dist/fetch.umd.js
// @require      ../../dist/es5/ytdl-core.js
// @match        *://youtube.com/watch?v=*
// @match        *://youtube.com/embed/*
// @match        *://*.youtube.com/watch?v=*
// @match        *://*.youtube.com/embed/*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document_end
// @grant        none
// ==/UserScript==

// add support for CSP 'Trusted Type' assignment
var add_default_trusted_type_policy = function() {
  if (typeof window.trustedTypes !== 'undefined') {
    try {
      var passthrough_policy = function(input) {return input}

      window.trustedTypes.createPolicy('default', {
          createHTML:      passthrough_policy,
          createScript:    passthrough_policy,
          createScriptURL: passthrough_policy
      })
    }
    catch(e) {}
  }
}

if (window.ytdl) {
  // avoid CSP error:
  //   Failed to set the 'innerHTML' property on 'Element': This document requires 'TrustedHTML' assignment.
  add_default_trusted_type_policy()

  window.ytdl.getInfo(window.location.href)
  .then(function(info) {
    var json = JSON.stringify(info, null, 2)
    var body = window.document.body

    body.removeAttribute('no-y-overflow')

    body.innerHTML             = '<pre>' + json + '</pre>'
    body.style.backgroundColor = 'white'
    body.style.overflowX       = 'auto'
    body.style.overflowY       = 'auto'
    body.style.fontFamily      = 'monospace'
    body.style.fontSize        = '14px'
  })
  .catch(function(error) {
    window.alert(error.message)
  })
}
