// ==UserScript==
// @name         browser-ytdl-core: no proxy
// @description  example: CORS restricts usage to 'youtube.com' domain
// @version      1.0.0
// @require      https://github.com/warren-bank/js-url/raw/v3.1.4/es5-browser/jsURL.js
// @require      ../../dist/es5/ytdl-core.js
// @match        *://youtube.com/watch?v=*
// @match        *://youtube.com/embed/*
// @match        *://*.youtube.com/watch?v=*
// @match        *://*.youtube.com/embed/*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document_end
// ==/UserScript==

var addAllGlobals = function() {
  // DOM for "youtube.com" is dirty.
  //   It contains many of its own polyfill libraries.
  //   This script depends on them!
  //
  //   Note that this is a brittle methodology,
  //   and this script could break if these libraries
  //   were to be removed from the YouTube web site.
  //
  //   In addition to the provided polyfills, "URL" is required.
  //   The old testing browser provides a non-functional "URL",
  //   and YouTube's polyfill libraries don't replace it.

  Object.assign(window, {"URL": window.jsURL.URL})
}

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
  addAllGlobals()

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
