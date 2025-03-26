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

# simple-cookie
## Installation
```
npm i @nuka9510/simple-cookie
```
## Usage
### npm
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "<path>/node_modules/@nuka9510/js-util/dist/index.js",
      "@nuka9510/simple-cookie": "<path>/node_modules/@nuka9510/simple-cookie/dist/index.js"
    }
  }
</script>
```
### cdn
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
      "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie/dist/index.js"
    }
  }
</script>
```
or
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util@latest/dist/index.js",
      "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie@latest/dist/index.js"
    }
  }
</script>
```
or
```
<script type="importmap">
  {
    "imports": {
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util@<specific-version>/dist/index.js",
      "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie@<specific-version>/dist/index.js"
    }
  }
</script>
```
### example
```
example
├── js
│  └── index.js
└── view
   └── index.html
```
* example/js/index.js
```
import { JUtil } from "@nuka9510/js-util";
import { SCookie } from "@nuka9510/simple-cookie";

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
      !JUtil.empty(name.value) &&
      !JUtil.empty(value.value)
    ) {
      const cookie = new SCookie(name.value, value.value),
      result = document.querySelector('[data-name="result"]');

      if (!JUtil.empty(expires.value)) { cookie.setExpires(new Date(expires.value)); }

      SCookie.setCookie(cookie);

      result.innerHTML = document.cookie;
    } else { alert(`'name' 또는 'value'를 입력 해주세요.`); }
  }

  onPopCookieClick(ev) {
    const name = document.querySelector('[data-name="name"]');

    if (!JUtil.empty(name.value)) {
      const result = document.querySelector('[data-name="result"]');

      SCookie.popCookie(name.value);

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
      "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
      "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie/dist/index.js"
    }
  }
</script>
<script type="module" src="../js/index.js"></script>
</html>
```