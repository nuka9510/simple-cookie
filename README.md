[![LICENSE][license]][license-url]
[![GITHUB-VERSION][github-version]][github-version-url]
[![NPM-VERSION][npm-version]][npm-version-url]
![GITHUB-LAST-COMMIT][github-last-commit]
![NPM-LAST-UPDATE][npm-last-update]
![GITHUB-REPO-SIZE][github-repo-size]
![NPM-UNPACKED-SIZE][npm-unpacked-size]
![JSDELIVR-DOWNLOAD][jsdelivr-download]
![NPM-DOWNLOAD][npm-download]
![TOP-LANGUAGE][top-language]

[license]: https://img.shields.io/npm/l/%40nuka9510%2Fsimple-cookie
[license-url]: https://github.com/nuka9510/simple-cookie/blob/main/LICENSE

[github-version]: https://img.shields.io/github/package-json/v/nuka9510/simple-cookie?logo=github
[github-version-url]: https://github.com/nuka9510/simple-cookie

[npm-version]: https://img.shields.io/npm/v/%40nuka9510%2Fsimple-cookie?logo=npm
[npm-version-url]: https://www.npmjs.com/package/@nuka9510/simple-cookie

[github-last-commit]: https://img.shields.io/github/last-commit/nuka9510/simple-cookie?logo=github

[npm-last-update]: https://img.shields.io/npm/last-update/%40nuka9510%2Fsimple-cookie?logo=npm

[github-repo-size]: https://img.shields.io/github/repo-size/nuka9510/simple-cookie?logo=github

[npm-unpacked-size]: https://img.shields.io/npm/unpacked-size/%40nuka9510%2Fsimple-cookie?logo=npm

[jsdelivr-download]: https://img.shields.io/jsdelivr/npm/hm/%40nuka9510/simple-cookie?logo=jsdelivr

[npm-download]: https://img.shields.io/npm/dm/%40nuka9510%2Fsimple-cookie?logo=npm

[top-language]: https://img.shields.io/github/languages/top/nuka9510/simple-cookie

## Install
```
npm i @nuka9510/simple-cookie
```
```
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie/dist/js/index.min.js"> </script>
```
```
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie@latest/dist/js/index.min.js"> </script>
```
```
<script src="https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie@<specific-version>/dist/js/index.min.js"> </script>
```
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie/dist/esm/index.mjs"
    }
  }
</script>
```
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie@latest/dist/esm/index.mjs"
    }
  }
</script>
```
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie@<specific-version>/dist/esm/index.mjs"
    }
  }
</script>
```
## Usage
### js (> 1.1.2)
```
const cookie = new simpleCookie.Cookie("key", "value");

simpleCookie.Cookie.setCookie(cookie);
```
### mjs
```
import { Cookie } from "@nuka9510/simple-cookie";

const cookie = new Cookie("key", "value");

Cookie.setCookie(cookie);
```
### cjs (> 1.3.2)
```
const simpleCookie = require('@nuka9510/simple-cookie'),
cookie = new simpleCookie.Cookie("key", "value");

simpleCookie.Cookie.setCookie(cookie);
```
### example
```
example
├── js
│  └── index.mjs
└── view
   └── index.html
```
* example/js/index.mjs
```
import { Util } from "@nuka9510/js-util";
import { Cookie } from "@nuka9510/simple-cookie";

class Index {
  constructor() {
    this.onSetCookieClick = this.onSetCookieClick.bind(this);
    this.onPopCookieClick = this.onPopCookieClick.bind(this);

    this.init();
  }

  init() {
    document.querySelectorAll('[data-action="set-cookie-click"]').forEach((...arg) => { arg[0].addEventListener('click', this.onSetCookieClick); });
    document.querySelectorAll('[data-action="pop-cookie-click"]').forEach((...arg) => { arg[0].addEventListener('click', this.onPopCookieClick); });
  }

  onSetCookieClick(ev) {
    const name = document.querySelector('[data-name="name"]'),
    value = document.querySelector('[data-name="value"]'),
    expires = document.querySelector('[data-name="expires"]');

    if (
      !Util.empty(name.value) &&
      !Util.empty(value.value)
    ) {
      const cookie = new Cookie(name.value, value.value),
      result = document.querySelector('[data-name="result"]');

      if (!Util.empty(expires.value)) { cookie.setExpires(new Date(expires.value)); }

      Cookie.setCookie(cookie);

      result.innerHTML = document.cookie;
    } else { alert(`'name' 또는 'value'를 입력 해주세요.`); }
  }

  onPopCookieClick(ev) {
    const name = document.querySelector('[data-name="name"]');

    if (!Util.empty(name.value)) {
      const cookie = Cookie.getCookie(name.value),
      result = document.querySelector('[data-name="result"]');

      Cookie.popCookie(cookie);

      result.innerHTML = document.cookie;
    } else { alert(`'name'을 입력 해주세요.`); }
  }

}

new Index();
```
* example/view/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div style="display: flex; flex-direction: column;">
    <div data-name="result"></div>
    <input type="text" data-name="name" placeholder="name">
    <input type="text" data-name="value" placeholder="value">
    <input type="datetime-local" data-name="expires" placeholder="expires">
    <div style="display: flex;">
      <button type="button" data-action="set-cookie-click">set-cookie</button>
      <button type="button" data-action="pop-cookie-click">pop-cookie</button>
    </div>
  </div>
</body>
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/esm/index.min.mjs",
      "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie/dist/esm/index.min.mjs"
    }
  }
</script>
<script type="module" src="../js/index.mjs"></script>
</html>
```