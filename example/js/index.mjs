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
      const cookie = new SCookie(name.value),
      result = document.querySelector('[data-name="result"]');

      SCookie.popCookie(cookie);

      result.innerHTML = document.cookie;
    } else { alert(`'name'을 입력 해주세요.`); }
  }

}

new Index();