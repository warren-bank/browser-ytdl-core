### [_browser-ytdl-core_](https://github.com/warren-bank/browser-ytdl-core/tree/ybd-project)

Browser build for [_node-ytdl-core_](https://github.com/ybd-project-ver1/ytdl-core): YouTube video downloader in pure javascript

#### Build

```bash
npm run build
```

#### CDN

```html
  <script src="//cdn.jsdelivr.net/npm/@warren-bank/browser-ytdl-core@6.0.5-ybd-project.1/dist/es2020/ytdl-core.js"></script>
```

#### Usage

1. run the [client-side javascript library](./dist/es2020/ytdl-core.js) in a web browser
   * examples:
     1. [userscript](./example/es2020/ytdl-core.no-proxy.user.js)
        - domain: `youtube.com`
        - notes:
          * Youtube API calls made by _browser-ytdl-core_ succeed
          * CORS is allowed
     2. [userscript with proxy](./example/es2020/ytdl-core.with-proxy.user.js)
        - domain: `example.com`
        - notes:
          * uses the same proxy as the [official demo](https://ytdlcore.static.jp/)
          * this proxy injects HTTP response headers that allow CORS

#### Legal

* license for [_node-ytdl-core_](https://github.com/ybd-project-ver1/ytdl-core) is [MIT](https://github.com/ybd-project-ver1/ytdl-core/blob/latest/LICENSE)
* license for [_browser-ytdl-core_](https://github.com/warren-bank/browser-ytdl-core/releases/tag/v6.0.5-ybd-project.1) is [GPL-2.0](https://github.com/warren-bank/browser-ytdl-core/blob/v6.0.5-ybd-project.1/LICENSE.txt)
  - only covers the content of this repo, which contains primarily build scripts
  - excludes the content of the [`dist`](./dist/) directory, which contains code from _node-ytdl-core_
