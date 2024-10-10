### [_browser-ytdl-core_](https://github.com/warren-bank/browser-ytdl-core/tree/distubejs)

Browser build for [_node-ytdl-core_](https://github.com/distubejs/ytdl-core): YouTube video downloader in pure javascript

#### Build

```bash
npm install

npm run build
```

#### CDN

```html
  <script src="//cdn.jsdelivr.net/npm/@warren-bank/browser-ytdl-core@4.14.4-distubejs.2/dist/es2020/ytdl-core.js"></script>
```

#### Usage

1. run the [client-side javascript library](./dist/es2020/ytdl-core.js) in a web browser
   * examples:
     1. [userscript](./example/es2020/ytdl-core.no-proxy.user.js)
        - domain: `youtube.com`
        - notes:
          * Youtube API calls made by _browser-ytdl-core_ succeed
          * CORS is allowed
     2. [userscript with "cors-anywhere" proxy](./example/es2020/ytdl-core.with-proxy.user.js)
        - domain: `example.com`
        - notes:
          * usage of the "cors-anywhere" [demo server](https://cors-anywhere.herokuapp.com/corsdemo) first requires user interaction
            - visit the site to click a button
            - this adds the requesting IP to a whitelist, and grants access for a limited period of time
          * this proxy injects HTTP response headers that allow CORS

#### Legal

* license for [_node-ytdl-core_](https://github.com/distubejs/ytdl-core/releases/tag/4.14.4) is [MIT](https://github.com/distubejs/ytdl-core/blob/4.14.4/LICENSE)
* license for [_browser-ytdl-core_](https://github.com/warren-bank/browser-ytdl-core/releases/tag/v4.14.4-distubejs.2) is [GPL-2.0](https://github.com/warren-bank/browser-ytdl-core/blob/v4.14.4-distubejs.2/LICENSE.txt)
  - only covers the content of this repo, which contains primarily build scripts
