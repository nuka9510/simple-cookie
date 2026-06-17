var simpleCookie;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/cookie.js":
/*!************************!*\
  !*** ./dist/cookie.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cookie)
/* harmony export */ });
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nuka9510/js-util */ "./node_modules/@nuka9510/js-util/dist/esm/index.min.mjs");

/**
 * `WebBrowser`에서 `Cookie`를 다루기 위한 객체
 */
class Cookie {
    /** cookie-name */
    #name;
    /** cookie-value */
    #value;
    /**
     * 쿠키를 보낼 호스트를 정의합니다
     *
     * 현재 도메인에서 값을 설정할 수 있거나, 공개 접미사가 아니면 상위 도메인으로 설정할 수 있습니다. 도메인을 설정하는 것은 해당 도메인뿐만 아니라 모든 하위 도메인에도 쿠키를 사용할 수 있게 합니다.
     *
     * 만약 생략된다면 이 속성은 하위 도메인을 포함하지 않고, 현재 문서 URL의 호스트를 기본 값으로 설정합니다.
     *
     * 이전 명세서와 다르게 도메인 이름 안의 선행점(`.example.com`)은 무시합니다.
     *
     * 여러 개의 호스트/도메인 값은 허용되지 않지만, 도메인이 지정됐다면 하위 도메인은 항상 포함됩니다.
     */
    #domain;
    /**
     * HTTP 날짜 타임스탬프로 쿠키의 최대 생명주기를 나타냅니다.
     *
     * 만약 지정되지 않았으면 쿠키는 세션 쿠키입니다. 클라이언트가 종료될 때 세션이 종료되고, 그 후 쿠키를 제거합니다.
     *
     * `Expires` 날짜가 설정될 때, 기한은 서버가 아닌 쿠키가 설정되는 클라이언트에 상대적입니다.
     */
    #expires;
    /**
     * JavaScript가 `Document.cookie` 속성 등을 통해 쿠키에 접근하는 것을 금지합니다. `HttpOnly`로 만들어진 쿠키는 `XMLHttpRequest.send()` 또는 `fetch()`등을 호출할 때 여전히 JavaScript 시작 요청과 함께 전송합니다. 이것은 사이트 간 스크립팅({@link https://developer.mozilla.org/ko/docs/Glossary/Cross-site_scripting XSS})에 대한 공격을 완화합니다.
     *
     * #default `false`
     */
    #httpOnly = false;
    /**
     * 쿠키가 만료할 때까지의 시간(초)을 나타냅니다. 0 또는 음수는 쿠키를 즉시 만료합니다. 만약 `Expire`와 `Max-Age`를 둘 다 설정했으면 `Max-Age`가 우선순위를 가집니다.
     */
    #maxAge;
    /**
     * 쿠키는 분할 저장소를 사용하여 저장해야 함을 나타냅니다. 더 많은 내용은 {@link https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies Cookies Having Independent Partitioned State (CHIPS)}를 참고하세요.
     *
     * #default `false`
     */
    #partition = false;
    /**
     * 브라우저가 `Cookie` 헤더를 전송하기 위해 요청된 URL 안에 반드시 존재해야 하는 경로를 나타냅니다.
     *
     * 슬래시(`/`) 문자는 디렉토리 구분자로 해석되고, 하위 디렉토리도 마찬가지입니다. 예를 들어 `Path=/docs`인 경우,
     ** 요청 경로 `/docs`, `/docs/`, `/docs/Web/`, `/docs/Web/HTTP`는 모두 일치합니다.
     ** 요청 경로 `/`, `/docsets`, `/fr/docs`는 일치하지 않습니다.
     */
    #path;
    /**
     * 사이트 간 요청과 함께 쿠키가 전송될지를 제어하여 사이트 간 요청 위조 공격({@link https://developer.mozilla.org/ko/docs/Glossary/CSRF CSRF})에 대한 일부 보호를 제공합니다.
     *
     ** `Strict`  \
     * 브라우저가 동일한 사이트 요청에만 쿠키를 전송한다는 것을 의미합니다. 즉, 쿠키를 설정한 동일한 사이트에서 발생하는 요청에만 쿠키를 전송합니다. 만약 다른 도메인 또는 같은 도메인의 스키마에서 발생하는 요청이라면 `SameSite=Strict` 속성이 있는 쿠키는 전송되지 않습니다.
     ** `Lax`  \
     * 이미지 또는 프레임을 불러오는 요청과 같은 사이트 간 요청은 쿠키가 전송되지 않는 것을 의미합니다. 하지만 사용자가 링크를 따라갈 때처럼 외부 사이트에서 원래 사이트로 이동할 때는 쿠키를 전송합니다. 이것은 `SameSite` 속성이 명시되지 않았으면 기본 값으로 동작합니다.
     ** `None`  \
     * 브라우저가 사이트 간 요청, 같은 사이트 요청 모두 쿠키를 보내는 것을 의미합니다. 이 값을 설정할 때, SameSite=None; Secure와 같이 Secure 속성도 설정되어야 합니다. 만약 Secure가 없는 경우 다음과 같은 오류를 기록합니다.
     * ```
     * Cookie "myCookie" rejected because it has the "SameSite=None" attribute but is missing the "secure" attribute.
     *
     * This Set-Cookie was blocked because it had the "SameSite=None" attribute but did not have the "Secure" attribute, which is required in order to use "SameSite=None".
     * ```
     *> 참고: `Secure` 쿠키는 HTTPS 프로토콜을 통해 암호화된 요청에서만 서버로 전송합니다. 안전하지 않은 사이트(`http:`)는 `Secure` 지시어로 쿠키를 설정할 수 없으므로 `SameSite=None`을 사용할 수 없습니다.
     */
    #sameSite;
    /**
     * 쿠키가 localhost를 제외한 `https:` 스키마에서 요청할 때만 쿠키가 전송되는걸 나타냅니다. 따라서 {@link https://developer.mozilla.org/ko/docs/Glossary/MitM 중간자} 공격에 더 강합니다.
     *
     *> 참고: `Secure`가 쿠키 안에 있는 세션 키, 로그인 정보 등과 같은 민감한 정보에 대한 모든 접근을 예방한다고 가정하지 마십시오. 이 속성이 있는 쿠키는 클라이언트의 하드디스크에 접근하거나, `HttpOnly` 쿠키 속성이 설정되지 않은 경우 JavaScirpt를 통해 여전히 읽기/수정이 모두 가능합니다.
     *
     *> 안전하지 않은 사이트(`http:`)는 Chrome 52, Firefox 52 이후로 `Secure` 속성을 설정할 수 없습니다. Chrome 89, Firefox 75이후로 로컬 호스트에서 `Secure` 속성을 설정할 때 `https:` 요구 사항은 무시합니다.
     *
     * #default `false`
     */
    #secure = false;
    /** code-value encode/decode 용 정규식 객체 */
    static #regex = {
        /** code-value encode 용 정규식 객체 */
        encode: new RegExp(encodeURIComponent(' '), 'g'),
        /** code-value decode 용 정규식 객체 */
        decode: new RegExp('\\+', 'g')
    };
    /**
     * `Cookie`에 저장을 위한 객체
     *
     * ```
     * <script type="importmap">
     *   {
     *     "imports": {
     *       "@nuka9510/js-util": "https://cdn.jsdelivr.net/npm/@nuka9510/js-util/dist/index.js",
     *       "@nuka9510/simple-cookie": "https://cdn.jsdelivr.net/npm/@nuka9510/simple-cookie/dist/index.js"
     *     }
     *   }
     * </script>
     * <script type="module">
     *   import { JUtil } from "@nuka9510/js-util";
     *   import { Cookie } from "@nuka9510/simple-cookie";
     *
     *   const cookie = new Cookie('key', 'value');
     *
     *   cookie.setExpires(JUtil.addDate(new Date(), { day: 7 }));
     *
     *   Cookie.setCookie(cookie);
     * </script>
     * ```
     */
    constructor(
    /** `cookie-name` */ name, 
    /** `cookie-value` */ value) {
        if (typeof name != "string" ||
            typeof value != "string") {
            throw new TypeError(`'name' 또는 'value'가 'string'이 아닙니다.`);
        }
        if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.Util.empty(name)) {
            throw new Error(`'name'이 비어있습니다.`);
        }
        this.#name = name;
        this.#value = Cookie.#encode(value);
    }
    /** cookie-name */
    get name() { return this.#name; }
    /** cookie-value */
    get value() { return Cookie.#decode(this.#value); }
    /** cookie */
    get #cookie() { return `${this.#name}=${this.#value};`; }
    /**
     * 쿠키를 보낼 호스트를 정의합니다
     *
     * 현재 도메인에서 값을 설정할 수 있거나, 공개 접미사가 아니면 상위 도메인으로 설정할 수 있습니다. 도메인을 설정하는 것은 해당 도메인뿐만 아니라 모든 하위 도메인에도 쿠키를 사용할 수 있게 합니다.
     *
     * 만약 생략된다면 이 속성은 하위 도메인을 포함하지 않고, 현재 문서 URL의 호스트를 기본 값으로 설정합니다.
     *
     * 이전 명세서와 다르게 도메인 이름 안의 선행점(`.example.com`)은 무시합니다.
     *
     * 여러 개의 호스트/도메인 값은 허용되지 않지만, 도메인이 지정됐다면 하위 도메인은 항상 포함됩니다.
     *
     * `Domain=domain;`
     */
    get domain() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.Util.empty(this.#domain) ? '' : `Domain=${this.#domain};`; }
    /**
     * HTTP 날짜 타임스탬프로 쿠키의 최대 생명주기를 나타냅니다.
     *
     * 만약 지정되지 않았으면 쿠키는 세션 쿠키입니다. 클라이언트가 종료될 때 세션이 종료되고, 그 후 쿠키를 제거합니다.
     *
     * `Expires` 날짜가 설정될 때, 기한은 서버가 아닌 쿠키가 설정되는 클라이언트에 상대적입니다.
     *
     * `Expires=expires;`
     */
    get expires() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.Util.empty(this.#expires) ? '' : `Expires=${this.#expires.toUTCString()};`; }
    /**
     * JavaScript가 `Document.cookie` 속성 등을 통해 쿠키에 접근하는 것을 금지합니다. `HttpOnly`로 만들어진 쿠키는 `XMLHttpRequest.send()` 또는 `fetch()`등을 호출할 때 여전히 JavaScript 시작 요청과 함께 전송합니다. 이것은 사이트 간 스크립팅({@link https://developer.mozilla.org/ko/docs/Glossary/Cross-site_scripting XSS})에 대한 공격을 완화합니다.
     *
     * `HttpOnly;`
     */
    get httpOnly() { return (this.#httpOnly) ? 'HttpOnly;' : ''; }
    /**
     * 쿠키가 만료할 때까지의 시간(초)을 나타냅니다. 0 또는 음수는 쿠키를 즉시 만료합니다. 만약 `Expire`와 `Max-Age`를 둘 다 설정했으면 `Max-Age`가 우선순위를 가집니다.
     *
     * `Max-Age=maxAge;`
     */
    get maxAge() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.Util.isNumber(this.#maxAge, true) ? `Max-Age=${this.#maxAge};` : ''; }
    /**
     * 쿠키는 분할 저장소를 사용하여 저장해야 함을 나타냅니다. 더 많은 내용은 {@link https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies Cookies Having Independent Partitioned State (CHIPS)}를 참고하세요.
     *
     * `Partitioned;`
     */
    get partition() { return (this.#partition) ? 'Partitioned;' : ''; }
    /**
     * 브라우저가 `Cookie` 헤더를 전송하기 위해 요청된 URL 안에 반드시 존재해야 하는 경로를 나타냅니다.
     *
     * 슬래시(`/`) 문자는 디렉토리 구분자로 해석되고, 하위 디렉토리도 마찬가지입니다. 예를 들어 `Path=/docs`인 경우,
     ** 요청 경로 `/docs`, `/docs/`, `/docs/Web/`, `/docs/Web/HTTP`는 모두 일치합니다.
     *
     * `Path=path;`
     */
    get path() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.Util.empty(this.#path) ? '' : `Path=${this.#path};`; }
    /**
     * 사이트 간 요청과 함께 쿠키가 전송될지를 제어하여 사이트 간 요청 위조 공격({@link https://developer.mozilla.org/ko/docs/Glossary/CSRF CSRF})에 대한 일부 보호를 제공합니다.
     *
     ** `Strict`  \
     * 브라우저가 동일한 사이트 요청에만 쿠키를 전송한다는 것을 의미합니다. 즉, 쿠키를 설정한 동일한 사이트에서 발생하는 요청에만 쿠키를 전송합니다. 만약 다른 도메인 또는 같은 도메인의 스키마에서 발생하는 요청이라면 `SameSite=Strict` 속성이 있는 쿠키는 전송되지 않습니다.
     ** `Lax`  \
     * 이미지 또는 프레임을 불러오는 요청과 같은 사이트 간 요청은 쿠키가 전송되지 않는 것을 의미합니다. 하지만 사용자가 링크를 따라갈 때처럼 외부 사이트에서 원래 사이트로 이동할 때는 쿠키를 전송합니다. 이것은 `SameSite` 속성이 명시되지 않았으면 기본 값으로 동작합니다.
     ** `None`  \
     * 브라우저가 사이트 간 요청, 같은 사이트 요청 모두 쿠키를 보내는 것을 의미합니다. 이 값을 설정할 때, SameSite=None; Secure와 같이 Secure 속성도 설정되어야 합니다. 만약 Secure가 없는 경우 다음과 같은 오류를 기록합니다.
     * ```
     * Cookie "myCookie" rejected because it has the "SameSite=None" attribute but is missing the "secure" attribute.
     *
     * This Set-Cookie was blocked because it had the "SameSite=None" attribute but did not have the "Secure" attribute, which is required in order to use "SameSite=None".
     * ```
     *> 참고: `Secure` 쿠키는 HTTPS 프로토콜을 통해 암호화된 요청에서만 서버로 전송합니다. 안전하지 않은 사이트(`http:`)는 `Secure` 지시어로 쿠키를 설정할 수 없으므로 `SameSite=None`을 사용할 수 없습니다.
     *
     * `SameSite=sameSite;`
     */
    get sameSite() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.Util.empty(this.#sameSite) ? '' : `SameSite=${this.#sameSite};`; }
    /**
     * 쿠키가 localhost를 제외한 `https:` 스키마에서 요청할 때만 쿠키가 전송되는걸 나타냅니다. 따라서 {@link https://developer.mozilla.org/ko/docs/Glossary/MitM 중간자} 공격에 더 강합니다.
     *
     *> 참고: `Secure`가 쿠키 안에 있는 세션 키, 로그인 정보 등과 같은 민감한 정보에 대한 모든 접근을 예방한다고 가정하지 마십시오. 이 속성이 있는 쿠키는 클라이언트의 하드디스크에 접근하거나, `HttpOnly` 쿠키 속성이 설정되지 않은 경우 JavaScirpt를 통해 여전히 읽기/수정이 모두 가능합니다.
     *
     *> 안전하지 않은 사이트(`http:`)는 Chrome 52, Firefox 52 이후로 `Secure` 속성을 설정할 수 없습니다. Chrome 89, Firefox 75이후로 로컬 호스트에서 `Secure` 속성을 설정할 때 `https:` 요구 사항은 무시합니다.
     *
     * `Secure;`
     */
    get secure() { return (this.#secure) ? 'Secure;' : ''; }
    /** `Domain` 설정 */
    setDomain(
    /**
     * 쿠키를 보낼 호스트를 정의합니다
     *
     * 현재 도메인에서 값을 설정할 수 있거나, 공개 접미사가 아니면 상위 도메인으로 설정할 수 있습니다. 도메인을 설정하는 것은 해당 도메인뿐만 아니라 모든 하위 도메인에도 쿠키를 사용할 수 있게 합니다.
     *
     * 만약 생략된다면 이 속성은 하위 도메인을 포함하지 않고, 현재 문서 URL의 호스트를 기본 값으로 설정합니다.
     *
     * 이전 명세서와 다르게 도메인 이름 안의 선행점(`.example.com`)은 무시합니다.
     *
     * 여러 개의 호스트/도메인 값은 허용되지 않지만, 도메인이 지정됐다면 하위 도메인은 항상 포함됩니다.
     */
    domain) { this.#domain = domain; }
    /** `Expires` 설정 */
    setExpires(
    /**
     * HTTP 날짜 타임스탬프로 쿠키의 최대 생명주기를 나타냅니다.
     *
     * 만약 지정되지 않았으면 쿠키는 세션 쿠키입니다. 클라이언트가 종료될 때 세션이 종료되고, 그 후 쿠키를 제거합니다.
     *
     * `Expires` 날짜가 설정될 때, 기한은 서버가 아닌 쿠키가 설정되는 클라이언트에 상대적입니다.
     */
    expires) { this.#expires = expires; }
    /** `HttpOnly` 설정 */
    setHttpOnly(
    /**
     * JavaScript가 `Document.cookie` 속성 등을 통해 쿠키에 접근하는 것을 금지합니다. `HttpOnly`로 만들어진 쿠키는 `XMLHttpRequest.send()` 또는 `fetch()`등을 호출할 때 여전히 JavaScript 시작 요청과 함께 전송합니다. 이것은 사이트 간 스크립팅({@link https://developer.mozilla.org/ko/docs/Glossary/Cross-site_scripting XSS})에 대한 공격을 완화합니다.
     */
    httpOnly) { this.#httpOnly = httpOnly; }
    /** `Max-Age` 설정 */
    setMaxAge(
    /**
     * 쿠키가 만료할 때까지의 시간(초)을 나타냅니다. 0 또는 음수는 쿠키를 즉시 만료합니다. 만약 `Expire`와 `Max-Age`를 둘 다 설정했으면 `Max-Age`가 우선순위를 가집니다.
     */
    maxAge) { this.#maxAge = maxAge; }
    /** `Partition` 설정 */
    setPartition(
    /**
     * 쿠키는 분할 저장소를 사용하여 저장해야 함을 나타냅니다. 더 많은 내용은 {@link https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies Cookies Having Independent Partitioned State (CHIPS)}를 참고하세요.
     */
    partition) { this.#partition = partition; }
    /** `Path` 설정 */
    setPath(
    /**
     * 브라우저가 `Cookie` 헤더를 전송하기 위해 요청된 URL 안에 반드시 존재해야 하는 경로를 나타냅니다.
     *
     * 슬래시(`/`) 문자는 디렉토리 구분자로 해석되고, 하위 디렉토리도 마찬가지입니다. 예를 들어 `Path=/docs`인 경우,
     ** 요청 경로 `/docs`, `/docs/`, `/docs/Web/`, `/docs/Web/HTTP`는 모두 일치합니다.
     ** 요청 경로 `/`, `/docsets`, `/fr/docs`는 일치하지 않습니다.
     */
    path) { this.#path = path; }
    /** `SameSite` 설정 */
    setSameSite(
    /**
     * 사이트 간 요청과 함께 쿠키가 전송될지를 제어하여 사이트 간 요청 위조 공격({@link https://developer.mozilla.org/ko/docs/Glossary/CSRF CSRF})에 대한 일부 보호를 제공합니다.
     *
     ** `Strict`  \
     * 브라우저가 동일한 사이트 요청에만 쿠키를 전송한다는 것을 의미합니다. 즉, 쿠키를 설정한 동일한 사이트에서 발생하는 요청에만 쿠키를 전송합니다. 만약 다른 도메인 또는 같은 도메인의 스키마에서 발생하는 요청이라면 `SameSite=Strict` 속성이 있는 쿠키는 전송되지 않습니다.
     ** `Lax`  \
     * 이미지 또는 프레임을 불러오는 요청과 같은 사이트 간 요청은 쿠키가 전송되지 않는 것을 의미합니다. 하지만 사용자가 링크를 따라갈 때처럼 외부 사이트에서 원래 사이트로 이동할 때는 쿠키를 전송합니다. 이것은 `SameSite` 속성이 명시되지 않았으면 기본 값으로 동작합니다.
     ** `None`  \
     * 브라우저가 사이트 간 요청, 같은 사이트 요청 모두 쿠키를 보내는 것을 의미합니다. 이 값을 설정할 때, SameSite=None; Secure와 같이 Secure 속성도 설정되어야 합니다. 만약 Secure가 없는 경우 다음과 같은 오류를 기록합니다.
     * ```
     * Cookie "myCookie" rejected because it has the "SameSite=None" attribute but is missing the "secure" attribute.
     *
     * This Set-Cookie was blocked because it had the "SameSite=None" attribute but did not have the "Secure" attribute, which is required in order to use "SameSite=None".
     * ```
     *> 참고: `Secure` 쿠키는 HTTPS 프로토콜을 통해 암호화된 요청에서만 서버로 전송합니다. 안전하지 않은 사이트(`http:`)는 `Secure` 지시어로 쿠키를 설정할 수 없으므로 `SameSite=None`을 사용할 수 없습니다.
     */
    sameSite) { this.#sameSite = sameSite; }
    /** `Secure` 설정 */
    setSecure(
    /**
     * 쿠키가 localhost를 제외한 `https:` 스키마에서 요청할 때만 쿠키가 전송되는걸 나타냅니다. 따라서 {@link https://developer.mozilla.org/ko/docs/Glossary/MitM 중간자} 공격에 더 강합니다.
     *
     *> 참고: `Secure`가 쿠키 안에 있는 세션 키, 로그인 정보 등과 같은 민감한 정보에 대한 모든 접근을 예방한다고 가정하지 마십시오. 이 속성이 있는 쿠키는 클라이언트의 하드디스크에 접근하거나, `HttpOnly` 쿠키 속성이 설정되지 않은 경우 JavaScirpt를 통해 여전히 읽기/수정이 모두 가능합니다.
     *
     *> 안전하지 않은 사이트(`http:`)는 Chrome 52, Firefox 52 이후로 `Secure` 속성을 설정할 수 없습니다. Chrome 89, Firefox 75이후로 로컬 호스트에서 `Secure` 속성을 설정할 때 `https:` 요구 사항은 무시합니다.
     */
    secure) { this.#secure = secure; }
    /** `Set-Cookie`헤더 문자열을 반환한다. */
    toString() { return `${this.#cookie} ${this.domain} ${this.expires} ${this.httpOnly} ${this.maxAge} ${this.partition} ${this.path} ${this.sameSite} ${this.secure}`.trim(); }
    /**
     * `cookie` 값 반환
     *
     * ```
     * const cookie1 = new Cookie('name1', 'value1');
     * const cookie1 = new Cookie('name2', 'value2');
     *
     * Cookie.setCookie(cookie1);
     * Cookie.setCookie(cookie2);
     *
     * console.log(Cookie.getCookie('name1'));
     * console.log(Cookie.getCookie('name2'));
     * console.log(Cookie.getCookie(['name1', 'name2']));
     * ```
     */
    static getCookie(name) {
        let cookie = document.cookie
            .split('; ')
            .values()
            .map((...arg) => arg[0].split('='));
        if (Array.isArray(name)) {
            return cookie.filter((...arg) => name.includes(arg[0][0]))
                .map((...arg) => new Cookie(arg[0][0], Cookie.#decode(arg[0][1])))
                .toArray();
        }
        else {
            cookie = cookie.find((...arg) => arg[0][0] == name);
            if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.Util.empty(cookie)) {
                return new Cookie(cookie[0], Cookie.#decode(cookie[1]));
            }
            else {
                return null;
            }
        }
    }
    /**
     * `cookie` 값 설정
     *
     * ```
     * const cookie = new Cookie('name', 'value');
     *
     * Cookie.setCookie(cookie);
     * ```
     */
    static setCookie(cookie) { document.cookie = cookie.toString(); }
    /**
     * `cookie` 값 제거
     *
     * ```
     * const cookie = new Cookie('name', 'value');
     *
     * Cookie.setCookie(cookie);
     *
     * Cookie.popCookie(cookie);
     * ```
     */
    static popCookie(cookie) {
        const expires = cookie.#expires, maxAge = cookie.#maxAge;
        cookie.setMaxAge(0);
        Cookie.setCookie(cookie);
        cookie.setExpires(expires);
        cookie.setMaxAge(maxAge);
    }
    /** cookie-value encode 값 반환 */
    static #encode(value) { return encodeURIComponent(value).replace(Cookie.#regex.encode, '+'); }
    /** cookie-value decode 값 반환 */
    static #decode(value) { return decodeURIComponent(value.replace(Cookie.#regex.decode, encodeURIComponent(' '))); }
}


/***/ }),

/***/ "./node_modules/@nuka9510/js-util/dist/esm/index.min.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/@nuka9510/js-util/dist/esm/index.min.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Util: () => (/* binding */ q)
/* harmony export */ });
var r=function(){return r=Object.assign||function(r){for(var e,t=1,a=arguments.length;t<a;t++)for(var o in e=arguments[t])Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r},r.apply(this,arguments)};function e(e,t){for(var a={},o={},i=e.split("~~"),s=!1,l=0;i.length>l;l++){for(var c=i[l].split("~"),n=0;n<c.length;n+=2){var u=c[n],p=c[n+1],g="&"+u+";";a[g]=p,s&&(a["&"+u]=p),o[p]=g}s=!0}return t?{entities:r(r({},a),t.entities),characters:r(r({},o),t.characters)}:{entities:a,characters:o}}var t={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g},a={};a.xml=e("lt~<~gt~>~quot~\"~apos~'~amp~&"),a.html4=e("apos~'~OElig~Œ~oelig~œ~Scaron~Š~scaron~š~Yuml~Ÿ~circ~ˆ~tilde~˜~ensp~ ~emsp~ ~thinsp~ ~zwnj~‌~zwj~‍~lrm~‎~rlm~‏~ndash~–~mdash~—~lsquo~‘~rsquo~’~sbquo~‚~ldquo~“~rdquo~”~bdquo~„~dagger~†~Dagger~‡~permil~‰~lsaquo~‹~rsaquo~›~euro~€~fnof~ƒ~Alpha~Α~Beta~Β~Gamma~Γ~Delta~Δ~Epsilon~Ε~Zeta~Ζ~Eta~Η~Theta~Θ~Iota~Ι~Kappa~Κ~Lambda~Λ~Mu~Μ~Nu~Ν~Xi~Ξ~Omicron~Ο~Pi~Π~Rho~Ρ~Sigma~Σ~Tau~Τ~Upsilon~Υ~Phi~Φ~Chi~Χ~Psi~Ψ~Omega~Ω~alpha~α~beta~β~gamma~γ~delta~δ~epsilon~ε~zeta~ζ~eta~η~theta~θ~iota~ι~kappa~κ~lambda~λ~mu~μ~nu~ν~xi~ξ~omicron~ο~pi~π~rho~ρ~sigmaf~ς~sigma~σ~tau~τ~upsilon~υ~phi~φ~chi~χ~psi~ψ~omega~ω~thetasym~ϑ~upsih~ϒ~piv~ϖ~bull~•~hellip~…~prime~′~Prime~″~oline~‾~frasl~⁄~weierp~℘~image~ℑ~real~ℜ~trade~™~alefsym~ℵ~larr~←~uarr~↑~rarr~→~darr~↓~harr~↔~crarr~↵~lArr~⇐~uArr~⇑~rArr~⇒~dArr~⇓~hArr~⇔~forall~∀~part~∂~exist~∃~empty~∅~nabla~∇~isin~∈~notin~∉~ni~∋~prod~∏~sum~∑~minus~−~lowast~∗~radic~√~prop~∝~infin~∞~ang~∠~and~∧~or~∨~cap~∩~cup~∪~int~∫~there4~∴~sim~∼~cong~≅~asymp~≈~ne~≠~equiv~≡~le~≤~ge~≥~sub~⊂~sup~⊃~nsub~⊄~sube~⊆~supe~⊇~oplus~⊕~otimes~⊗~perp~⊥~sdot~⋅~lceil~⌈~rceil~⌉~lfloor~⌊~rfloor~⌋~lang~〈~rang~〉~loz~◊~spades~♠~clubs~♣~hearts~♥~diams~♦~~nbsp~ ~iexcl~¡~cent~¢~pound~£~curren~¤~yen~¥~brvbar~¦~sect~§~uml~¨~copy~©~ordf~ª~laquo~«~not~¬~shy~­~reg~®~macr~¯~deg~°~plusmn~±~sup2~²~sup3~³~acute~´~micro~µ~para~¶~middot~·~cedil~¸~sup1~¹~ordm~º~raquo~»~frac14~¼~frac12~½~frac34~¾~iquest~¿~Agrave~À~Aacute~Á~Acirc~Â~Atilde~Ã~Auml~Ä~Aring~Å~AElig~Æ~Ccedil~Ç~Egrave~È~Eacute~É~Ecirc~Ê~Euml~Ë~Igrave~Ì~Iacute~Í~Icirc~Î~Iuml~Ï~ETH~Ð~Ntilde~Ñ~Ograve~Ò~Oacute~Ó~Ocirc~Ô~Otilde~Õ~Ouml~Ö~times~×~Oslash~Ø~Ugrave~Ù~Uacute~Ú~Ucirc~Û~Uuml~Ü~Yacute~Ý~THORN~Þ~szlig~ß~agrave~à~aacute~á~acirc~â~atilde~ã~auml~ä~aring~å~aelig~æ~ccedil~ç~egrave~è~eacute~é~ecirc~ê~euml~ë~igrave~ì~iacute~í~icirc~î~iuml~ï~eth~ð~ntilde~ñ~ograve~ò~oacute~ó~ocirc~ô~otilde~õ~ouml~ö~divide~÷~oslash~ø~ugrave~ù~uacute~ú~ucirc~û~uuml~ü~yacute~ý~thorn~þ~yuml~ÿ~quot~\"~amp~&~lt~<~gt~>"),a.html5=e('Abreve~Ă~Acy~А~Afr~𝔄~Amacr~Ā~And~⩓~Aogon~Ą~Aopf~𝔸~ApplyFunction~⁡~Ascr~𝒜~Assign~≔~Backslash~∖~Barv~⫧~Barwed~⌆~Bcy~Б~Because~∵~Bernoullis~ℬ~Bfr~𝔅~Bopf~𝔹~Breve~˘~Bscr~ℬ~Bumpeq~≎~CHcy~Ч~Cacute~Ć~Cap~⋒~CapitalDifferentialD~ⅅ~Cayleys~ℭ~Ccaron~Č~Ccirc~Ĉ~Cconint~∰~Cdot~Ċ~Cedilla~¸~CenterDot~·~Cfr~ℭ~CircleDot~⊙~CircleMinus~⊖~CirclePlus~⊕~CircleTimes~⊗~ClockwiseContourIntegral~∲~CloseCurlyDoubleQuote~”~CloseCurlyQuote~’~Colon~∷~Colone~⩴~Congruent~≡~Conint~∯~ContourIntegral~∮~Copf~ℂ~Coproduct~∐~CounterClockwiseContourIntegral~∳~Cross~⨯~Cscr~𝒞~Cup~⋓~CupCap~≍~DD~ⅅ~DDotrahd~⤑~DJcy~Ђ~DScy~Ѕ~DZcy~Џ~Darr~↡~Dashv~⫤~Dcaron~Ď~Dcy~Д~Del~∇~Dfr~𝔇~DiacriticalAcute~´~DiacriticalDot~˙~DiacriticalDoubleAcute~˝~DiacriticalGrave~`~DiacriticalTilde~˜~Diamond~⋄~DifferentialD~ⅆ~Dopf~𝔻~Dot~¨~DotDot~⃜~DotEqual~≐~DoubleContourIntegral~∯~DoubleDot~¨~DoubleDownArrow~⇓~DoubleLeftArrow~⇐~DoubleLeftRightArrow~⇔~DoubleLeftTee~⫤~DoubleLongLeftArrow~⟸~DoubleLongLeftRightArrow~⟺~DoubleLongRightArrow~⟹~DoubleRightArrow~⇒~DoubleRightTee~⊨~DoubleUpArrow~⇑~DoubleUpDownArrow~⇕~DoubleVerticalBar~∥~DownArrow~↓~DownArrowBar~⤓~DownArrowUpArrow~⇵~DownBreve~̑~DownLeftRightVector~⥐~DownLeftTeeVector~⥞~DownLeftVector~↽~DownLeftVectorBar~⥖~DownRightTeeVector~⥟~DownRightVector~⇁~DownRightVectorBar~⥗~DownTee~⊤~DownTeeArrow~↧~Downarrow~⇓~Dscr~𝒟~Dstrok~Đ~ENG~Ŋ~Ecaron~Ě~Ecy~Э~Edot~Ė~Efr~𝔈~Element~∈~Emacr~Ē~EmptySmallSquare~◻~EmptyVerySmallSquare~▫~Eogon~Ę~Eopf~𝔼~Equal~⩵~EqualTilde~≂~Equilibrium~⇌~Escr~ℰ~Esim~⩳~Exists~∃~ExponentialE~ⅇ~Fcy~Ф~Ffr~𝔉~FilledSmallSquare~◼~FilledVerySmallSquare~▪~Fopf~𝔽~ForAll~∀~Fouriertrf~ℱ~Fscr~ℱ~GJcy~Ѓ~Gammad~Ϝ~Gbreve~Ğ~Gcedil~Ģ~Gcirc~Ĝ~Gcy~Г~Gdot~Ġ~Gfr~𝔊~Gg~⋙~Gopf~𝔾~GreaterEqual~≥~GreaterEqualLess~⋛~GreaterFullEqual~≧~GreaterGreater~⪢~GreaterLess~≷~GreaterSlantEqual~⩾~GreaterTilde~≳~Gscr~𝒢~Gt~≫~HARDcy~Ъ~Hacek~ˇ~Hat~^~Hcirc~Ĥ~Hfr~ℌ~HilbertSpace~ℋ~Hopf~ℍ~HorizontalLine~─~Hscr~ℋ~Hstrok~Ħ~HumpDownHump~≎~HumpEqual~≏~IEcy~Е~IJlig~Ĳ~IOcy~Ё~Icy~И~Idot~İ~Ifr~ℑ~Im~ℑ~Imacr~Ī~ImaginaryI~ⅈ~Implies~⇒~Int~∬~Integral~∫~Intersection~⋂~InvisibleComma~⁣~InvisibleTimes~⁢~Iogon~Į~Iopf~𝕀~Iscr~ℐ~Itilde~Ĩ~Iukcy~І~Jcirc~Ĵ~Jcy~Й~Jfr~𝔍~Jopf~𝕁~Jscr~𝒥~Jsercy~Ј~Jukcy~Є~KHcy~Х~KJcy~Ќ~Kcedil~Ķ~Kcy~К~Kfr~𝔎~Kopf~𝕂~Kscr~𝒦~LJcy~Љ~Lacute~Ĺ~Lang~⟪~Laplacetrf~ℒ~Larr~↞~Lcaron~Ľ~Lcedil~Ļ~Lcy~Л~LeftAngleBracket~⟨~LeftArrow~←~LeftArrowBar~⇤~LeftArrowRightArrow~⇆~LeftCeiling~⌈~LeftDoubleBracket~⟦~LeftDownTeeVector~⥡~LeftDownVector~⇃~LeftDownVectorBar~⥙~LeftFloor~⌊~LeftRightArrow~↔~LeftRightVector~⥎~LeftTee~⊣~LeftTeeArrow~↤~LeftTeeVector~⥚~LeftTriangle~⊲~LeftTriangleBar~⧏~LeftTriangleEqual~⊴~LeftUpDownVector~⥑~LeftUpTeeVector~⥠~LeftUpVector~↿~LeftUpVectorBar~⥘~LeftVector~↼~LeftVectorBar~⥒~Leftarrow~⇐~Leftrightarrow~⇔~LessEqualGreater~⋚~LessFullEqual~≦~LessGreater~≶~LessLess~⪡~LessSlantEqual~⩽~LessTilde~≲~Lfr~𝔏~Ll~⋘~Lleftarrow~⇚~Lmidot~Ŀ~LongLeftArrow~⟵~LongLeftRightArrow~⟷~LongRightArrow~⟶~Longleftarrow~⟸~Longleftrightarrow~⟺~Longrightarrow~⟹~Lopf~𝕃~LowerLeftArrow~↙~LowerRightArrow~↘~Lscr~ℒ~Lsh~↰~Lstrok~Ł~Lt~≪~Map~⤅~Mcy~М~MediumSpace~ ~Mellintrf~ℳ~Mfr~𝔐~MinusPlus~∓~Mopf~𝕄~Mscr~ℳ~NJcy~Њ~Nacute~Ń~Ncaron~Ň~Ncedil~Ņ~Ncy~Н~NegativeMediumSpace~​~NegativeThickSpace~​~NegativeThinSpace~​~NegativeVeryThinSpace~​~NestedGreaterGreater~≫~NestedLessLess~≪~NewLine~\n~Nfr~𝔑~NoBreak~⁠~NonBreakingSpace~ ~Nopf~ℕ~Not~⫬~NotCongruent~≢~NotCupCap~≭~NotDoubleVerticalBar~∦~NotElement~∉~NotEqual~≠~NotEqualTilde~≂̸~NotExists~∄~NotGreater~≯~NotGreaterEqual~≱~NotGreaterFullEqual~≧̸~NotGreaterGreater~≫̸~NotGreaterLess~≹~NotGreaterSlantEqual~⩾̸~NotGreaterTilde~≵~NotHumpDownHump~≎̸~NotHumpEqual~≏̸~NotLeftTriangle~⋪~NotLeftTriangleBar~⧏̸~NotLeftTriangleEqual~⋬~NotLess~≮~NotLessEqual~≰~NotLessGreater~≸~NotLessLess~≪̸~NotLessSlantEqual~⩽̸~NotLessTilde~≴~NotNestedGreaterGreater~⪢̸~NotNestedLessLess~⪡̸~NotPrecedes~⊀~NotPrecedesEqual~⪯̸~NotPrecedesSlantEqual~⋠~NotReverseElement~∌~NotRightTriangle~⋫~NotRightTriangleBar~⧐̸~NotRightTriangleEqual~⋭~NotSquareSubset~⊏̸~NotSquareSubsetEqual~⋢~NotSquareSuperset~⊐̸~NotSquareSupersetEqual~⋣~NotSubset~⊂⃒~NotSubsetEqual~⊈~NotSucceeds~⊁~NotSucceedsEqual~⪰̸~NotSucceedsSlantEqual~⋡~NotSucceedsTilde~≿̸~NotSuperset~⊃⃒~NotSupersetEqual~⊉~NotTilde~≁~NotTildeEqual~≄~NotTildeFullEqual~≇~NotTildeTilde~≉~NotVerticalBar~∤~Nscr~𝒩~Ocy~О~Odblac~Ő~Ofr~𝔒~Omacr~Ō~Oopf~𝕆~OpenCurlyDoubleQuote~“~OpenCurlyQuote~‘~Or~⩔~Oscr~𝒪~Otimes~⨷~OverBar~‾~OverBrace~⏞~OverBracket~⎴~OverParenthesis~⏜~PartialD~∂~Pcy~П~Pfr~𝔓~PlusMinus~±~Poincareplane~ℌ~Popf~ℙ~Pr~⪻~Precedes~≺~PrecedesEqual~⪯~PrecedesSlantEqual~≼~PrecedesTilde~≾~Product~∏~Proportion~∷~Proportional~∝~Pscr~𝒫~Qfr~𝔔~Qopf~ℚ~Qscr~𝒬~RBarr~⤐~Racute~Ŕ~Rang~⟫~Rarr~↠~Rarrtl~⤖~Rcaron~Ř~Rcedil~Ŗ~Rcy~Р~Re~ℜ~ReverseElement~∋~ReverseEquilibrium~⇋~ReverseUpEquilibrium~⥯~Rfr~ℜ~RightAngleBracket~⟩~RightArrow~→~RightArrowBar~⇥~RightArrowLeftArrow~⇄~RightCeiling~⌉~RightDoubleBracket~⟧~RightDownTeeVector~⥝~RightDownVector~⇂~RightDownVectorBar~⥕~RightFloor~⌋~RightTee~⊢~RightTeeArrow~↦~RightTeeVector~⥛~RightTriangle~⊳~RightTriangleBar~⧐~RightTriangleEqual~⊵~RightUpDownVector~⥏~RightUpTeeVector~⥜~RightUpVector~↾~RightUpVectorBar~⥔~RightVector~⇀~RightVectorBar~⥓~Rightarrow~⇒~Ropf~ℝ~RoundImplies~⥰~Rrightarrow~⇛~Rscr~ℛ~Rsh~↱~RuleDelayed~⧴~SHCHcy~Щ~SHcy~Ш~SOFTcy~Ь~Sacute~Ś~Sc~⪼~Scedil~Ş~Scirc~Ŝ~Scy~С~Sfr~𝔖~ShortDownArrow~↓~ShortLeftArrow~←~ShortRightArrow~→~ShortUpArrow~↑~SmallCircle~∘~Sopf~𝕊~Sqrt~√~Square~□~SquareIntersection~⊓~SquareSubset~⊏~SquareSubsetEqual~⊑~SquareSuperset~⊐~SquareSupersetEqual~⊒~SquareUnion~⊔~Sscr~𝒮~Star~⋆~Sub~⋐~Subset~⋐~SubsetEqual~⊆~Succeeds~≻~SucceedsEqual~⪰~SucceedsSlantEqual~≽~SucceedsTilde~≿~SuchThat~∋~Sum~∑~Sup~⋑~Superset~⊃~SupersetEqual~⊇~Supset~⋑~TRADE~™~TSHcy~Ћ~TScy~Ц~Tab~\t~Tcaron~Ť~Tcedil~Ţ~Tcy~Т~Tfr~𝔗~Therefore~∴~ThickSpace~  ~ThinSpace~ ~Tilde~∼~TildeEqual~≃~TildeFullEqual~≅~TildeTilde~≈~Topf~𝕋~TripleDot~⃛~Tscr~𝒯~Tstrok~Ŧ~Uarr~↟~Uarrocir~⥉~Ubrcy~Ў~Ubreve~Ŭ~Ucy~У~Udblac~Ű~Ufr~𝔘~Umacr~Ū~UnderBar~_~UnderBrace~⏟~UnderBracket~⎵~UnderParenthesis~⏝~Union~⋃~UnionPlus~⊎~Uogon~Ų~Uopf~𝕌~UpArrow~↑~UpArrowBar~⤒~UpArrowDownArrow~⇅~UpDownArrow~↕~UpEquilibrium~⥮~UpTee~⊥~UpTeeArrow~↥~Uparrow~⇑~Updownarrow~⇕~UpperLeftArrow~↖~UpperRightArrow~↗~Upsi~ϒ~Uring~Ů~Uscr~𝒰~Utilde~Ũ~VDash~⊫~Vbar~⫫~Vcy~В~Vdash~⊩~Vdashl~⫦~Vee~⋁~Verbar~‖~Vert~‖~VerticalBar~∣~VerticalLine~|~VerticalSeparator~❘~VerticalTilde~≀~VeryThinSpace~ ~Vfr~𝔙~Vopf~𝕍~Vscr~𝒱~Vvdash~⊪~Wcirc~Ŵ~Wedge~⋀~Wfr~𝔚~Wopf~𝕎~Wscr~𝒲~Xfr~𝔛~Xopf~𝕏~Xscr~𝒳~YAcy~Я~YIcy~Ї~YUcy~Ю~Ycirc~Ŷ~Ycy~Ы~Yfr~𝔜~Yopf~𝕐~Yscr~𝒴~ZHcy~Ж~Zacute~Ź~Zcaron~Ž~Zcy~З~Zdot~Ż~ZeroWidthSpace~​~Zfr~ℨ~Zopf~ℤ~Zscr~𝒵~abreve~ă~ac~∾~acE~∾̳~acd~∿~acy~а~af~⁡~afr~𝔞~aleph~ℵ~amacr~ā~amalg~⨿~andand~⩕~andd~⩜~andslope~⩘~andv~⩚~ange~⦤~angle~∠~angmsd~∡~angmsdaa~⦨~angmsdab~⦩~angmsdac~⦪~angmsdad~⦫~angmsdae~⦬~angmsdaf~⦭~angmsdag~⦮~angmsdah~⦯~angrt~∟~angrtvb~⊾~angrtvbd~⦝~angsph~∢~angst~Å~angzarr~⍼~aogon~ą~aopf~𝕒~ap~≈~apE~⩰~apacir~⩯~ape~≊~apid~≋~approx~≈~approxeq~≊~ascr~𝒶~ast~*~asympeq~≍~awconint~∳~awint~⨑~bNot~⫭~backcong~≌~backepsilon~϶~backprime~‵~backsim~∽~backsimeq~⋍~barvee~⊽~barwed~⌅~barwedge~⌅~bbrk~⎵~bbrktbrk~⎶~bcong~≌~bcy~б~becaus~∵~because~∵~bemptyv~⦰~bepsi~϶~bernou~ℬ~beth~ℶ~between~≬~bfr~𝔟~bigcap~⋂~bigcirc~◯~bigcup~⋃~bigodot~⨀~bigoplus~⨁~bigotimes~⨂~bigsqcup~⨆~bigstar~★~bigtriangledown~▽~bigtriangleup~△~biguplus~⨄~bigvee~⋁~bigwedge~⋀~bkarow~⤍~blacklozenge~⧫~blacksquare~▪~blacktriangle~▴~blacktriangledown~▾~blacktriangleleft~◂~blacktriangleright~▸~blank~␣~blk12~▒~blk14~░~blk34~▓~block~█~bne~=⃥~bnequiv~≡⃥~bnot~⌐~bopf~𝕓~bot~⊥~bottom~⊥~bowtie~⋈~boxDL~╗~boxDR~╔~boxDl~╖~boxDr~╓~boxH~═~boxHD~╦~boxHU~╩~boxHd~╤~boxHu~╧~boxUL~╝~boxUR~╚~boxUl~╜~boxUr~╙~boxV~║~boxVH~╬~boxVL~╣~boxVR~╠~boxVh~╫~boxVl~╢~boxVr~╟~boxbox~⧉~boxdL~╕~boxdR~╒~boxdl~┐~boxdr~┌~boxh~─~boxhD~╥~boxhU~╨~boxhd~┬~boxhu~┴~boxminus~⊟~boxplus~⊞~boxtimes~⊠~boxuL~╛~boxuR~╘~boxul~┘~boxur~└~boxv~│~boxvH~╪~boxvL~╡~boxvR~╞~boxvh~┼~boxvl~┤~boxvr~├~bprime~‵~breve~˘~bscr~𝒷~bsemi~⁏~bsim~∽~bsime~⋍~bsol~\\~bsolb~⧅~bsolhsub~⟈~bullet~•~bump~≎~bumpE~⪮~bumpe~≏~bumpeq~≏~cacute~ć~capand~⩄~capbrcup~⩉~capcap~⩋~capcup~⩇~capdot~⩀~caps~∩︀~caret~⁁~caron~ˇ~ccaps~⩍~ccaron~č~ccirc~ĉ~ccups~⩌~ccupssm~⩐~cdot~ċ~cemptyv~⦲~centerdot~·~cfr~𝔠~chcy~ч~check~✓~checkmark~✓~cir~○~cirE~⧃~circeq~≗~circlearrowleft~↺~circlearrowright~↻~circledR~®~circledS~Ⓢ~circledast~⊛~circledcirc~⊚~circleddash~⊝~cire~≗~cirfnint~⨐~cirmid~⫯~cirscir~⧂~clubsuit~♣~colon~:~colone~≔~coloneq~≔~comma~,~commat~@~comp~∁~compfn~∘~complement~∁~complexes~ℂ~congdot~⩭~conint~∮~copf~𝕔~coprod~∐~copysr~℗~cross~✗~cscr~𝒸~csub~⫏~csube~⫑~csup~⫐~csupe~⫒~ctdot~⋯~cudarrl~⤸~cudarrr~⤵~cuepr~⋞~cuesc~⋟~cularr~↶~cularrp~⤽~cupbrcap~⩈~cupcap~⩆~cupcup~⩊~cupdot~⊍~cupor~⩅~cups~∪︀~curarr~↷~curarrm~⤼~curlyeqprec~⋞~curlyeqsucc~⋟~curlyvee~⋎~curlywedge~⋏~curvearrowleft~↶~curvearrowright~↷~cuvee~⋎~cuwed~⋏~cwconint~∲~cwint~∱~cylcty~⌭~dHar~⥥~daleth~ℸ~dash~‐~dashv~⊣~dbkarow~⤏~dblac~˝~dcaron~ď~dcy~д~dd~ⅆ~ddagger~‡~ddarr~⇊~ddotseq~⩷~demptyv~⦱~dfisht~⥿~dfr~𝔡~dharl~⇃~dharr~⇂~diam~⋄~diamond~⋄~diamondsuit~♦~die~¨~digamma~ϝ~disin~⋲~div~÷~divideontimes~⋇~divonx~⋇~djcy~ђ~dlcorn~⌞~dlcrop~⌍~dollar~$~dopf~𝕕~dot~˙~doteq~≐~doteqdot~≑~dotminus~∸~dotplus~∔~dotsquare~⊡~doublebarwedge~⌆~downarrow~↓~downdownarrows~⇊~downharpoonleft~⇃~downharpoonright~⇂~drbkarow~⤐~drcorn~⌟~drcrop~⌌~dscr~𝒹~dscy~ѕ~dsol~⧶~dstrok~đ~dtdot~⋱~dtri~▿~dtrif~▾~duarr~⇵~duhar~⥯~dwangle~⦦~dzcy~џ~dzigrarr~⟿~eDDot~⩷~eDot~≑~easter~⩮~ecaron~ě~ecir~≖~ecolon~≕~ecy~э~edot~ė~ee~ⅇ~efDot~≒~efr~𝔢~eg~⪚~egs~⪖~egsdot~⪘~el~⪙~elinters~⏧~ell~ℓ~els~⪕~elsdot~⪗~emacr~ē~emptyset~∅~emptyv~∅~emsp13~ ~emsp14~ ~eng~ŋ~eogon~ę~eopf~𝕖~epar~⋕~eparsl~⧣~eplus~⩱~epsi~ε~epsiv~ϵ~eqcirc~≖~eqcolon~≕~eqsim~≂~eqslantgtr~⪖~eqslantless~⪕~equals~=~equest~≟~equivDD~⩸~eqvparsl~⧥~erDot~≓~erarr~⥱~escr~ℯ~esdot~≐~esim~≂~excl~!~expectation~ℰ~exponentiale~ⅇ~fallingdotseq~≒~fcy~ф~female~♀~ffilig~ﬃ~fflig~ﬀ~ffllig~ﬄ~ffr~𝔣~filig~ﬁ~fjlig~fj~flat~♭~fllig~ﬂ~fltns~▱~fopf~𝕗~fork~⋔~forkv~⫙~fpartint~⨍~frac13~⅓~frac15~⅕~frac16~⅙~frac18~⅛~frac23~⅔~frac25~⅖~frac35~⅗~frac38~⅜~frac45~⅘~frac56~⅚~frac58~⅝~frac78~⅞~frown~⌢~fscr~𝒻~gE~≧~gEl~⪌~gacute~ǵ~gammad~ϝ~gap~⪆~gbreve~ğ~gcirc~ĝ~gcy~г~gdot~ġ~gel~⋛~geq~≥~geqq~≧~geqslant~⩾~ges~⩾~gescc~⪩~gesdot~⪀~gesdoto~⪂~gesdotol~⪄~gesl~⋛︀~gesles~⪔~gfr~𝔤~gg~≫~ggg~⋙~gimel~ℷ~gjcy~ѓ~gl~≷~glE~⪒~gla~⪥~glj~⪤~gnE~≩~gnap~⪊~gnapprox~⪊~gne~⪈~gneq~⪈~gneqq~≩~gnsim~⋧~gopf~𝕘~grave~`~gscr~ℊ~gsim~≳~gsime~⪎~gsiml~⪐~gtcc~⪧~gtcir~⩺~gtdot~⋗~gtlPar~⦕~gtquest~⩼~gtrapprox~⪆~gtrarr~⥸~gtrdot~⋗~gtreqless~⋛~gtreqqless~⪌~gtrless~≷~gtrsim~≳~gvertneqq~≩︀~gvnE~≩︀~hairsp~ ~half~½~hamilt~ℋ~hardcy~ъ~harrcir~⥈~harrw~↭~hbar~ℏ~hcirc~ĥ~heartsuit~♥~hercon~⊹~hfr~𝔥~hksearow~⤥~hkswarow~⤦~hoarr~⇿~homtht~∻~hookleftarrow~↩~hookrightarrow~↪~hopf~𝕙~horbar~―~hscr~𝒽~hslash~ℏ~hstrok~ħ~hybull~⁃~hyphen~‐~ic~⁣~icy~и~iecy~е~iff~⇔~ifr~𝔦~ii~ⅈ~iiiint~⨌~iiint~∭~iinfin~⧜~iiota~℩~ijlig~ĳ~imacr~ī~imagline~ℐ~imagpart~ℑ~imath~ı~imof~⊷~imped~Ƶ~in~∈~incare~℅~infintie~⧝~inodot~ı~intcal~⊺~integers~ℤ~intercal~⊺~intlarhk~⨗~intprod~⨼~iocy~ё~iogon~į~iopf~𝕚~iprod~⨼~iscr~𝒾~isinE~⋹~isindot~⋵~isins~⋴~isinsv~⋳~isinv~∈~it~⁢~itilde~ĩ~iukcy~і~jcirc~ĵ~jcy~й~jfr~𝔧~jmath~ȷ~jopf~𝕛~jscr~𝒿~jsercy~ј~jukcy~є~kappav~ϰ~kcedil~ķ~kcy~к~kfr~𝔨~kgreen~ĸ~khcy~х~kjcy~ќ~kopf~𝕜~kscr~𝓀~lAarr~⇚~lAtail~⤛~lBarr~⤎~lE~≦~lEg~⪋~lHar~⥢~lacute~ĺ~laemptyv~⦴~lagran~ℒ~langd~⦑~langle~⟨~lap~⪅~larrb~⇤~larrbfs~⤟~larrfs~⤝~larrhk~↩~larrlp~↫~larrpl~⤹~larrsim~⥳~larrtl~↢~lat~⪫~latail~⤙~late~⪭~lates~⪭︀~lbarr~⤌~lbbrk~❲~lbrace~{~lbrack~[~lbrke~⦋~lbrksld~⦏~lbrkslu~⦍~lcaron~ľ~lcedil~ļ~lcub~{~lcy~л~ldca~⤶~ldquor~„~ldrdhar~⥧~ldrushar~⥋~ldsh~↲~leftarrow~←~leftarrowtail~↢~leftharpoondown~↽~leftharpoonup~↼~leftleftarrows~⇇~leftrightarrow~↔~leftrightarrows~⇆~leftrightharpoons~⇋~leftrightsquigarrow~↭~leftthreetimes~⋋~leg~⋚~leq~≤~leqq~≦~leqslant~⩽~les~⩽~lescc~⪨~lesdot~⩿~lesdoto~⪁~lesdotor~⪃~lesg~⋚︀~lesges~⪓~lessapprox~⪅~lessdot~⋖~lesseqgtr~⋚~lesseqqgtr~⪋~lessgtr~≶~lesssim~≲~lfisht~⥼~lfr~𝔩~lg~≶~lgE~⪑~lhard~↽~lharu~↼~lharul~⥪~lhblk~▄~ljcy~љ~ll~≪~llarr~⇇~llcorner~⌞~llhard~⥫~lltri~◺~lmidot~ŀ~lmoust~⎰~lmoustache~⎰~lnE~≨~lnap~⪉~lnapprox~⪉~lne~⪇~lneq~⪇~lneqq~≨~lnsim~⋦~loang~⟬~loarr~⇽~lobrk~⟦~longleftarrow~⟵~longleftrightarrow~⟷~longmapsto~⟼~longrightarrow~⟶~looparrowleft~↫~looparrowright~↬~lopar~⦅~lopf~𝕝~loplus~⨭~lotimes~⨴~lowbar~_~lozenge~◊~lozf~⧫~lpar~(~lparlt~⦓~lrarr~⇆~lrcorner~⌟~lrhar~⇋~lrhard~⥭~lrtri~⊿~lscr~𝓁~lsh~↰~lsim~≲~lsime~⪍~lsimg~⪏~lsqb~[~lsquor~‚~lstrok~ł~ltcc~⪦~ltcir~⩹~ltdot~⋖~lthree~⋋~ltimes~⋉~ltlarr~⥶~ltquest~⩻~ltrPar~⦖~ltri~◃~ltrie~⊴~ltrif~◂~lurdshar~⥊~luruhar~⥦~lvertneqq~≨︀~lvnE~≨︀~mDDot~∺~male~♂~malt~✠~maltese~✠~map~↦~mapsto~↦~mapstodown~↧~mapstoleft~↤~mapstoup~↥~marker~▮~mcomma~⨩~mcy~м~measuredangle~∡~mfr~𝔪~mho~℧~mid~∣~midast~*~midcir~⫰~minusb~⊟~minusd~∸~minusdu~⨪~mlcp~⫛~mldr~…~mnplus~∓~models~⊧~mopf~𝕞~mp~∓~mscr~𝓂~mstpos~∾~multimap~⊸~mumap~⊸~nGg~⋙̸~nGt~≫⃒~nGtv~≫̸~nLeftarrow~⇍~nLeftrightarrow~⇎~nLl~⋘̸~nLt~≪⃒~nLtv~≪̸~nRightarrow~⇏~nVDash~⊯~nVdash~⊮~nacute~ń~nang~∠⃒~nap~≉~napE~⩰̸~napid~≋̸~napos~ŉ~napprox~≉~natur~♮~natural~♮~naturals~ℕ~nbump~≎̸~nbumpe~≏̸~ncap~⩃~ncaron~ň~ncedil~ņ~ncong~≇~ncongdot~⩭̸~ncup~⩂~ncy~н~neArr~⇗~nearhk~⤤~nearr~↗~nearrow~↗~nedot~≐̸~nequiv~≢~nesear~⤨~nesim~≂̸~nexist~∄~nexists~∄~nfr~𝔫~ngE~≧̸~nge~≱~ngeq~≱~ngeqq~≧̸~ngeqslant~⩾̸~nges~⩾̸~ngsim~≵~ngt~≯~ngtr~≯~nhArr~⇎~nharr~↮~nhpar~⫲~nis~⋼~nisd~⋺~niv~∋~njcy~њ~nlArr~⇍~nlE~≦̸~nlarr~↚~nldr~‥~nle~≰~nleftarrow~↚~nleftrightarrow~↮~nleq~≰~nleqq~≦̸~nleqslant~⩽̸~nles~⩽̸~nless~≮~nlsim~≴~nlt~≮~nltri~⋪~nltrie~⋬~nmid~∤~nopf~𝕟~notinE~⋹̸~notindot~⋵̸~notinva~∉~notinvb~⋷~notinvc~⋶~notni~∌~notniva~∌~notnivb~⋾~notnivc~⋽~npar~∦~nparallel~∦~nparsl~⫽⃥~npart~∂̸~npolint~⨔~npr~⊀~nprcue~⋠~npre~⪯̸~nprec~⊀~npreceq~⪯̸~nrArr~⇏~nrarr~↛~nrarrc~⤳̸~nrarrw~↝̸~nrightarrow~↛~nrtri~⋫~nrtrie~⋭~nsc~⊁~nsccue~⋡~nsce~⪰̸~nscr~𝓃~nshortmid~∤~nshortparallel~∦~nsim~≁~nsime~≄~nsimeq~≄~nsmid~∤~nspar~∦~nsqsube~⋢~nsqsupe~⋣~nsubE~⫅̸~nsube~⊈~nsubset~⊂⃒~nsubseteq~⊈~nsubseteqq~⫅̸~nsucc~⊁~nsucceq~⪰̸~nsup~⊅~nsupE~⫆̸~nsupe~⊉~nsupset~⊃⃒~nsupseteq~⊉~nsupseteqq~⫆̸~ntgl~≹~ntlg~≸~ntriangleleft~⋪~ntrianglelefteq~⋬~ntriangleright~⋫~ntrianglerighteq~⋭~num~#~numero~№~numsp~ ~nvDash~⊭~nvHarr~⤄~nvap~≍⃒~nvdash~⊬~nvge~≥⃒~nvgt~>⃒~nvinfin~⧞~nvlArr~⤂~nvle~≤⃒~nvlt~<⃒~nvltrie~⊴⃒~nvrArr~⤃~nvrtrie~⊵⃒~nvsim~∼⃒~nwArr~⇖~nwarhk~⤣~nwarr~↖~nwarrow~↖~nwnear~⤧~oS~Ⓢ~oast~⊛~ocir~⊚~ocy~о~odash~⊝~odblac~ő~odiv~⨸~odot~⊙~odsold~⦼~ofcir~⦿~ofr~𝔬~ogon~˛~ogt~⧁~ohbar~⦵~ohm~Ω~oint~∮~olarr~↺~olcir~⦾~olcross~⦻~olt~⧀~omacr~ō~omid~⦶~ominus~⊖~oopf~𝕠~opar~⦷~operp~⦹~orarr~↻~ord~⩝~order~ℴ~orderof~ℴ~origof~⊶~oror~⩖~orslope~⩗~orv~⩛~oscr~ℴ~osol~⊘~otimesas~⨶~ovbar~⌽~par~∥~parallel~∥~parsim~⫳~parsl~⫽~pcy~п~percnt~%~period~.~pertenk~‱~pfr~𝔭~phiv~ϕ~phmmat~ℳ~phone~☎~pitchfork~⋔~planck~ℏ~planckh~ℎ~plankv~ℏ~plus~+~plusacir~⨣~plusb~⊞~pluscir~⨢~plusdo~∔~plusdu~⨥~pluse~⩲~plussim~⨦~plustwo~⨧~pm~±~pointint~⨕~popf~𝕡~pr~≺~prE~⪳~prap~⪷~prcue~≼~pre~⪯~prec~≺~precapprox~⪷~preccurlyeq~≼~preceq~⪯~precnapprox~⪹~precneqq~⪵~precnsim~⋨~precsim~≾~primes~ℙ~prnE~⪵~prnap~⪹~prnsim~⋨~profalar~⌮~profline~⌒~profsurf~⌓~propto~∝~prsim~≾~prurel~⊰~pscr~𝓅~puncsp~ ~qfr~𝔮~qint~⨌~qopf~𝕢~qprime~⁗~qscr~𝓆~quaternions~ℍ~quatint~⨖~quest~?~questeq~≟~rAarr~⇛~rAtail~⤜~rBarr~⤏~rHar~⥤~race~∽̱~racute~ŕ~raemptyv~⦳~rangd~⦒~range~⦥~rangle~⟩~rarrap~⥵~rarrb~⇥~rarrbfs~⤠~rarrc~⤳~rarrfs~⤞~rarrhk~↪~rarrlp~↬~rarrpl~⥅~rarrsim~⥴~rarrtl~↣~rarrw~↝~ratail~⤚~ratio~∶~rationals~ℚ~rbarr~⤍~rbbrk~❳~rbrace~}~rbrack~]~rbrke~⦌~rbrksld~⦎~rbrkslu~⦐~rcaron~ř~rcedil~ŗ~rcub~}~rcy~р~rdca~⤷~rdldhar~⥩~rdquor~”~rdsh~↳~realine~ℛ~realpart~ℜ~reals~ℝ~rect~▭~rfisht~⥽~rfr~𝔯~rhard~⇁~rharu~⇀~rharul~⥬~rhov~ϱ~rightarrow~→~rightarrowtail~↣~rightharpoondown~⇁~rightharpoonup~⇀~rightleftarrows~⇄~rightleftharpoons~⇌~rightrightarrows~⇉~rightsquigarrow~↝~rightthreetimes~⋌~ring~˚~risingdotseq~≓~rlarr~⇄~rlhar~⇌~rmoust~⎱~rmoustache~⎱~rnmid~⫮~roang~⟭~roarr~⇾~robrk~⟧~ropar~⦆~ropf~𝕣~roplus~⨮~rotimes~⨵~rpar~)~rpargt~⦔~rppolint~⨒~rrarr~⇉~rscr~𝓇~rsh~↱~rsqb~]~rsquor~’~rthree~⋌~rtimes~⋊~rtri~▹~rtrie~⊵~rtrif~▸~rtriltri~⧎~ruluhar~⥨~rx~℞~sacute~ś~sc~≻~scE~⪴~scap~⪸~sccue~≽~sce~⪰~scedil~ş~scirc~ŝ~scnE~⪶~scnap~⪺~scnsim~⋩~scpolint~⨓~scsim~≿~scy~с~sdotb~⊡~sdote~⩦~seArr~⇘~searhk~⤥~searr~↘~searrow~↘~semi~;~seswar~⤩~setminus~∖~setmn~∖~sext~✶~sfr~𝔰~sfrown~⌢~sharp~♯~shchcy~щ~shcy~ш~shortmid~∣~shortparallel~∥~sigmav~ς~simdot~⩪~sime~≃~simeq~≃~simg~⪞~simgE~⪠~siml~⪝~simlE~⪟~simne~≆~simplus~⨤~simrarr~⥲~slarr~←~smallsetminus~∖~smashp~⨳~smeparsl~⧤~smid~∣~smile~⌣~smt~⪪~smte~⪬~smtes~⪬︀~softcy~ь~sol~/~solb~⧄~solbar~⌿~sopf~𝕤~spadesuit~♠~spar~∥~sqcap~⊓~sqcaps~⊓︀~sqcup~⊔~sqcups~⊔︀~sqsub~⊏~sqsube~⊑~sqsubset~⊏~sqsubseteq~⊑~sqsup~⊐~sqsupe~⊒~sqsupset~⊐~sqsupseteq~⊒~squ~□~square~□~squarf~▪~squf~▪~srarr~→~sscr~𝓈~ssetmn~∖~ssmile~⌣~sstarf~⋆~star~☆~starf~★~straightepsilon~ϵ~straightphi~ϕ~strns~¯~subE~⫅~subdot~⪽~subedot~⫃~submult~⫁~subnE~⫋~subne~⊊~subplus~⪿~subrarr~⥹~subset~⊂~subseteq~⊆~subseteqq~⫅~subsetneq~⊊~subsetneqq~⫋~subsim~⫇~subsub~⫕~subsup~⫓~succ~≻~succapprox~⪸~succcurlyeq~≽~succeq~⪰~succnapprox~⪺~succneqq~⪶~succnsim~⋩~succsim~≿~sung~♪~supE~⫆~supdot~⪾~supdsub~⫘~supedot~⫄~suphsol~⟉~suphsub~⫗~suplarr~⥻~supmult~⫂~supnE~⫌~supne~⊋~supplus~⫀~supset~⊃~supseteq~⊇~supseteqq~⫆~supsetneq~⊋~supsetneqq~⫌~supsim~⫈~supsub~⫔~supsup~⫖~swArr~⇙~swarhk~⤦~swarr~↙~swarrow~↙~swnwar~⤪~target~⌖~tbrk~⎴~tcaron~ť~tcedil~ţ~tcy~т~tdot~⃛~telrec~⌕~tfr~𝔱~therefore~∴~thetav~ϑ~thickapprox~≈~thicksim~∼~thkap~≈~thksim~∼~timesb~⊠~timesbar~⨱~timesd~⨰~tint~∭~toea~⤨~top~⊤~topbot~⌶~topcir~⫱~topf~𝕥~topfork~⫚~tosa~⤩~tprime~‴~triangle~▵~triangledown~▿~triangleleft~◃~trianglelefteq~⊴~triangleq~≜~triangleright~▹~trianglerighteq~⊵~tridot~◬~trie~≜~triminus~⨺~triplus~⨹~trisb~⧍~tritime~⨻~trpezium~⏢~tscr~𝓉~tscy~ц~tshcy~ћ~tstrok~ŧ~twixt~≬~twoheadleftarrow~↞~twoheadrightarrow~↠~uHar~⥣~ubrcy~ў~ubreve~ŭ~ucy~у~udarr~⇅~udblac~ű~udhar~⥮~ufisht~⥾~ufr~𝔲~uharl~↿~uharr~↾~uhblk~▀~ulcorn~⌜~ulcorner~⌜~ulcrop~⌏~ultri~◸~umacr~ū~uogon~ų~uopf~𝕦~uparrow~↑~updownarrow~↕~upharpoonleft~↿~upharpoonright~↾~uplus~⊎~upsi~υ~upuparrows~⇈~urcorn~⌝~urcorner~⌝~urcrop~⌎~uring~ů~urtri~◹~uscr~𝓊~utdot~⋰~utilde~ũ~utri~▵~utrif~▴~uuarr~⇈~uwangle~⦧~vArr~⇕~vBar~⫨~vBarv~⫩~vDash~⊨~vangrt~⦜~varepsilon~ϵ~varkappa~ϰ~varnothing~∅~varphi~ϕ~varpi~ϖ~varpropto~∝~varr~↕~varrho~ϱ~varsigma~ς~varsubsetneq~⊊︀~varsubsetneqq~⫋︀~varsupsetneq~⊋︀~varsupsetneqq~⫌︀~vartheta~ϑ~vartriangleleft~⊲~vartriangleright~⊳~vcy~в~vdash~⊢~vee~∨~veebar~⊻~veeeq~≚~vellip~⋮~verbar~|~vert~|~vfr~𝔳~vltri~⊲~vnsub~⊂⃒~vnsup~⊃⃒~vopf~𝕧~vprop~∝~vrtri~⊳~vscr~𝓋~vsubnE~⫋︀~vsubne~⊊︀~vsupnE~⫌︀~vsupne~⊋︀~vzigzag~⦚~wcirc~ŵ~wedbar~⩟~wedge~∧~wedgeq~≙~wfr~𝔴~wopf~𝕨~wp~℘~wr~≀~wreath~≀~wscr~𝓌~xcap~⋂~xcirc~◯~xcup~⋃~xdtri~▽~xfr~𝔵~xhArr~⟺~xharr~⟷~xlArr~⟸~xlarr~⟵~xmap~⟼~xnis~⋻~xodot~⨀~xopf~𝕩~xoplus~⨁~xotime~⨂~xrArr~⟹~xrarr~⟶~xscr~𝓍~xsqcup~⨆~xuplus~⨄~xutri~△~xvee~⋁~xwedge~⋀~yacy~я~ycirc~ŷ~ycy~ы~yfr~𝔶~yicy~ї~yopf~𝕪~yscr~𝓎~yucy~ю~zacute~ź~zcaron~ž~zcy~з~zdot~ż~zeetrf~ℨ~zfr~𝔷~zhcy~ж~zigrarr~⇝~zopf~𝕫~zscr~𝓏~~AMP~&~COPY~©~GT~>~LT~<~QUOT~"~REG~®',a.html4);var o={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376},i=String.fromCodePoint||function(r){return String.fromCharCode(Math.floor((r-65536)/1024)+55296,(r-65536)%1024+56320)},s=String.prototype.codePointAt?function(r,e){return r.codePointAt(e)}:function(r,e){return 1024*(r.charCodeAt(e)-55296)+r.charCodeAt(e+1)-56320+65536},l=function(){return l=Object.assign||function(r){for(var e,t=1,a=arguments.length;t<a;t++)for(var o in e=arguments[t])Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r},l.apply(this,arguments)},c=l(l({},a),{all:a.html5}),n={specialChars:/[<>'"&]/g,nonAscii:/[<>'"&\u0080-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g,nonAsciiPrintable:/[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g,nonAsciiPrintableOnly:/[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g,extensive:/[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF\uDC00-\uDFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g},u={mode:"specialChars",level:"all",numeric:"decimal"},p={scope:"body",level:"all"},g=/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g,d=/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g,m={xml:{strict:g,attribute:d,body:t.xml},html4:{strict:g,attribute:d,body:t.html4},html5:{strict:g,attribute:d,body:t.html5}},h=l(l({},m),{all:m.html5}),b=String.fromCharCode,f=b(65533);class q{static empty(r){let e=[void 0,null,0,""].includes(r);if(!e){if(r.constructor==Object)return 0==Object.keys(r).length&&0==Object.keys(Object.getPrototypeOf(r)).length;try{if(r.constructor==NodeList)return 0==r.length}catch(r){}if(Array.isArray(r))return 0==r.length}return e}static isNumber(r,e=!1){let t=!Number.isNaN(Number(r))&&["number","string"].includes(typeof r)&&!/^\s*$/.test(`${r}`);return t&&e&&(t="number"==typeof r),t}static isObject(r){return r?.constructor==Object}static numberFormat(r,e=0,t=".",a=","){if(!q.isNumber(r,!0)||!q.isNumber(e,!0))return null;const o=String(r).split(".");return o[0]=o[0].replace(/\B(?=(\d{3})+(?!\d))/g,a),q.empty(o[1])||(o[1]=o[1].substring(0,e)),q.empty(o[1])?o[0]:o[0].concat(t,o[1])}static strftime(r,e){const t=["January","February","March","April","May","June","July","August","September","October","November","December"],a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=(e=e.replace(/(%{1})/g,"\\$1")).replace(/(\\%){2}/g,"%")).replace(/\\%Y/g,String(r.getFullYear()))).replace(/\\%y/g,String(r.getFullYear()).replace(/^\d+(\d{2})$/,"$1"))).replace(/\\%B/g,t[r.getMonth()])).replace(/\\%b/g,t[r.getMonth()].replace(/^(\w{3})\w*$/,"$1"))).replace(/\\%m/g,String(r.getMonth()+1).replace(/^(\d{1})$/,"0$1"))).replace(/\\%d/g,String(r.getDate()).replace(/^(\d{1})$/,"0$1"))).replace(/\\%A/g,a[r.getDay()])).replace(/\\%a/g,a[r.getDay()].replace(/^(\w{3})\w*$/,"$1"))).replace(/\\%H/g,String(r.getHours()).replace(/^(\d{1})$/,"0$1"))).replace(/\\%I/g,String(r.getHours()>12?r.getHours()-12:r.getHours()).replace(/^0$/,"12").replace(/^(\d{1})$/,"0$1"))).replace(/\\%p/g,r.getHours()<12?"AM":"PM")).replace(/\\%M/g,String(r.getMinutes()).replace(/^(\d{1})$/,"0$1"))).replace(/\\%S/g,String(r.getSeconds()).replace(/^(\d{1})$/,"0$1"))}static checkdate(r,e,t){const a=new Date(r,e-1,t);return a.getFullYear()==r&&a.getMonth()+1==e&&a.getDate()==t}static equaldate(r,e=new Date){return q.strftime(r,"%Y-%m-%d")==q.strftime(e,"%Y-%m-%d")}static getWeek(r,e=!0){const t=["일요일","월요일","화요일","수요일","목요일","금요일","토요일"][r.getDay()];return e?t:t.replace(/^([ㄱ-ㅎㅏ-ㅣ가-힣]{1})[ㄱ-ㅎㅏ-ㅣ가-힣]+$/,"$1")}static addDate(r,e){return new Date(r.getFullYear()+(q.isNumber(e.year,!0)?e.year:0),r.getMonth()+(q.isNumber(e.month,!0)?e.month:0),r.getDate()+(q.isNumber(e.day,!0)?e.day:0),r.getHours()+(q.isNumber(e.hour,!0)?e.hour:0),r.getMinutes()+(q.isNumber(e.minute,!0)?e.minute:0),r.getSeconds()+(q.isNumber(e.second,!0)?e.second:0),r.getMilliseconds()+(q.isNumber(e.millisecond,!0)?e.millisecond:0))}static subDate(r,e){return new Date(r.getFullYear()-(q.isNumber(e.year,!0)?e.year:0),r.getMonth()-(q.isNumber(e.month,!0)?e.month:0),r.getDate()-(q.isNumber(e.day,!0)?e.day:0),r.getHours()-(q.isNumber(e.hour,!0)?e.hour:0),r.getMinutes()-(q.isNumber(e.minute,!0)?e.minute:0),r.getSeconds()-(q.isNumber(e.second,!0)?e.second:0),r.getMilliseconds()-(q.isNumber(e.millisecond,!0)?e.millisecond:0))}static xor(r,e){return!(r&&e)&&(r||e)}static formDataToJson(r){return JSON.stringify(Object.fromEntries([...new Set(r.keys())].map(((...e)=>[e[0],r.getAll(e[0]).length>1?r.getAll(e[0]):r.get(e[0])]))))}static percentage(r,e){return r*(e/100)}static ratio(r,e,t=!0){const a=t?[1,0]:[0,1];return e*r[a[0]]/r[a[1]]}static arithmeticSequence(r,e,t,a){return r+(a-e)*t}static geometricSequence(r,e,t,a){return r/t**(e-1)*t**(a-1)}static decimalAdjust(r,e,t=0){const[a,o="0"]=e.toString().split("e"),i=Math[r](Number(`${a}e${parseInt(o)+t}`)),[s,l="0"]=i.toString().split("e");return Number(`${s}e${parseInt(l)-t}`)}static encodeHtmlEntity(r){return function(r){var e=u.mode,t=u.numeric,a=void 0===t?"decimal":t,o=u.level;if(!r)return"";var i=n[void 0===e?"specialChars":e],l=c[void 0===o?"all":o].characters,p="hexadecimal"===a;return String.prototype.replace.call(r,i,(function(r){var e=l[r];if(!e){var t=r.length>1?s(r,0):r.charCodeAt(0);e=(p?"&#x"+t.toString(16):"&#"+t)+";"}return e}))}(r)}static decodeHtmlEntity(r){return function(r){var e=p.level,t=void 0===e?"all":e,a=p.scope,s=void 0===a?"xml"===t?"strict":"body":a;if(!r)return"";var l=h[t][s],n=c[t].entities,u="attribute"===s,g="strict"===s;return r.replace(l,(function(r){return function(r,e,t,a){var s=r,l=r[r.length-1];if(t&&"="===l)s=r;else if(a&&";"!==l)s=r;else{var c=e[r];if(c)s=c;else if("&"===r[0]&&"#"===r[1]){var n=r[2],u="x"==n||"X"==n?parseInt(r.substr(3),16):parseInt(r.substr(2));s=u>=1114111?f:u>65535?i(u):b(o[u]||u)}}return s}(r,n,u,g)}))}(r)}static copy(r){if(q.isObject(r)){const e={};for(const t in r)e[t]=q.copy(r[t]);return e}if(Array.isArray(r)){const e=[];for(const t of r)e.push(q.copy(t));return e}return r}static numRange(r,e){let t=e-r;const a=t>0;return t=Math.abs(t)+1,[...new Array(t)].map(((...e)=>e[1]*(a?1:-1)+r))}static arrayChunk(r,e){if(!q.isNumber(e,!0))throw new TypeError("size는 숫자 타입 이어야 합니다.");if(e<=0&&Number.isInteger(e))throw new RangeError("size는 0보다 큰 정수여야 합니다.");const t=[];return q.numRange(0,q.decimalAdjust("ceil",r.length/e)+(r.length>0?-1:0)).forEach(((...a)=>{t.push(r.slice(a[0]*e,(a[0]+1)*e))})),t}static get(r,e){return e(r)}static getOrElse(r,e,t=r=>r){return t(r)??e}}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cookie: () => (/* reexport safe */ _cookie_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ "./dist/cookie.js");



})();

simpleCookie = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map