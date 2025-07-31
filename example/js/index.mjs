import { Cookie } from "@nuka9510/simple-cookie";
import { Util } from "@nuka9510/simple-cookie/js-util";

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