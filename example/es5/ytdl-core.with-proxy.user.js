// ==UserScript==
// @name         browser-ytdl-core: with proxy
// @description  example: proxy is used to bypass CORS restriction, when CSP allows
// @version      1.0.0
// @require      https://cdnjs.cloudflare.com/ajax/libs/core-js/3.33.3/minified.min.js
// @require      https://unpkg.com/whatwg-fetch@3.6.19/dist/fetch.umd.js
// @require      ../../dist/es5/ytdl-core.js
// @match        *://example.com/*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document_end
// @grant        none
// ==/UserScript==

if (window.ytdl) {
  window.ytdl.getInfo(
    'https://www.youtube.com/watch?v=CICY20dQUPk',
    {
      requestOptions: {
        headers: {"x-requested-with": "ytdl-core"},
        proxyUrl: "https://cors-anywhere.herokuapp.com/",
        debug: true
      }
    }
  )
  .then(function(info) {
    var json = JSON.stringify(info, null, 2)
    var body = window.document.body

    body.innerHTML        = '<pre>' + json + '</pre>'
    body.style.overflow   = 'auto'
    body.style.fontFamily = 'monospace'
    body.style.fontSize   = '14px'
  })
  .catch(function(error) {
    window.alert(error.message)
  })
}
