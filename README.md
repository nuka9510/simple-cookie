[![GITHUB][github]][github-url]
[![NPM][npm]][npm-url]

# simple-cookie
## Installation
```
npm i @nuka9510/simple-cookie
```
## Usage
```
root
├── dist
│  ├── cookie.js
│  └── index.js
├── example
│  ├── js
│  │  └── index.js
│  └── view
│     └── index.html
└── node_modules
   └── @nuka9510
      └── js-util
         └── dist
            ├── index.js
            └── util.js
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
      "@nuka9510/js-util": "/node_modules/@nuka9510/js-util/dist/index.js",
      "@nuka9510/simple-cookie": "/dist/index.js"
    },
    "scopes": {
      "/dist/": { "/dist/cookie": "/dist/cookie.js" },
      "/node_modules/@nuka9510/js-util/dist/": { "/node_modules/@nuka9510/js-util/dist/util": "/node_modules/@nuka9510/js-util/dist/util.js" }
    }
  }
</script>
<script type="module" src="../js/index.js"></script>
</html>
```

[github]: https://img.shields.io/badge/github-blue.svg?style=flat&logo=github
[github-url]: https://github.com/nuka9510/simple-cookie
[npm]: https://img.shields.io/badge/npm-1.0.6-blue.svg?style=flat&logo=nodedotjs
[npm-url]: https://www.npmjs.com/package/@nuka9510/simple-cookie