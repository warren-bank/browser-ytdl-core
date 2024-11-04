// ==UserScript==
// @name         browser-ytdl-core: with proxy
// @description  example: proxy is used to bypass CORS restriction, when CSP allows
// @version      1.0.0
// @require      ../../dist/es2020/ytdl-core.js
// @match        *://example.com/*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document_end
// @grant        none
// ==/UserScript==

if (window.Ytdl && window.Ytdl.YtdlCore) {
  const proxy = {
    base:         'https://muddy-breeze-731b.ybd-project-v1.workers.dev',
    download:     'https://muddy-breeze-731b.ybd-project-v1.workers.dev/download',
    urlQueryName: 'url'
  }

  const ytdl = new window.Ytdl.YtdlCore({
    logDisplay: ['debug', 'info', 'success', 'warning', 'error'],
    disableInitialSetup: false,
    disableBasicCache: true,
    disableFileCache: true,
    disablePoTokenAutoGeneration: true,
    noUpdate: true,
    originalProxy: proxy
  })

  ytdl.getFullInfo('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
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
