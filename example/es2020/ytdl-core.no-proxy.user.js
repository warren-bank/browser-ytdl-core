// ==UserScript==
// @name         browser-ytdl-core: no proxy
// @description  example: CORS restricts usage to 'youtube.com' domain
// @version      1.0.0
// @require      ../../dist/es2020/ytdl-core.js
// @match        *://youtube.com/watch?v=*
// @match        *://youtube.com/embed/*
// @match        *://*.youtube.com/watch?v=*
// @match        *://*.youtube.com/embed/*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document_end
// ==/UserScript==

// add support for CSP 'Trusted Type' assignment
const add_default_trusted_type_policy = function() {
  if (typeof window.trustedTypes !== 'undefined') {
    try {
      const passthrough_policy = string => string

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
  .then(info => {
    const json = JSON.stringify(info, null, 2)
    const body = window.document.body

    body.removeAttribute('no-y-overflow')

    body.innerHTML             = `<pre>${json}</pre>`
    body.style.backgroundColor = 'white'
    body.style.overflowX       = 'auto'
    body.style.overflowY       = 'auto'
    body.style.fontFamily      = 'monospace'
    body.style.fontSize        = '14px'
  })
  .catch(error => {
    window.alert(error.message)
  })
}
