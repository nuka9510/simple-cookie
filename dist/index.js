var simpleCookie;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cookie)
/* harmony export */ });
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/**
 * `WebBrowser`에서 `Cookie`를 다루기 위한 객체
 */
class Cookie {
    /** cookie-name */
    #name;
    /**
     * cookie-value
     *
     * #default `''`
     */
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
     *   import { SCookie } from "@nuka9510/simple-cookie";
     *
     *   const cookie = new SCookie('key', 'value');
     *
     *   cookie.setExpires(JUtil.addDate(new Date(), { day: 7 }));
     *
     *   SCookie.setCookie(cookie);
     * </script>
     * ```
     */
    constructor(
    /** `cookie-name` */ name, 
    /** `cookie-value` #default `''` */ value = '') {
        if (_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(name)) {
            throw new Error(`'name'이 비어있습니다.`);
        }
        this.#name = name;
        this.#value = value;
    }
    /** cookie-name */
    get name() { return this.#name; }
    /** cookie-value */
    get value() { return this.#value; }
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
    get domain() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#domain) ? '' : `Domain=${this.#domain};`; }
    /**
     * HTTP 날짜 타임스탬프로 쿠키의 최대 생명주기를 나타냅니다.
     *
     * 만약 지정되지 않았으면 쿠키는 세션 쿠키입니다. 클라이언트가 종료될 때 세션이 종료되고, 그 후 쿠키를 제거합니다.
     *
     * `Expires` 날짜가 설정될 때, 기한은 서버가 아닌 쿠키가 설정되는 클라이언트에 상대적입니다.
     *
     * `Expires=expires;`
     */
    get expires() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#expires) ? '' : `Expires=${this.#expires.toUTCString()};`; }
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
    get maxAge() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.isNumber(this.#maxAge, true) ? `Max-Age=${this.#maxAge};` : ''; }
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
    get path() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#path) ? '' : `Path=${this.#path};`; }
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
    get sameSite() { return _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(this.#sameSite) ? '' : `SameSite=${this.#sameSite};`; }
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
    toString() {
        const regex = new RegExp(encodeURIComponent(' '), 'g'), value = encodeURIComponent(this.value).replace(regex, '+');
        return `${this.name}=${value}; ${this.domain} ${this.expires} ${this.httpOnly} ${this.maxAge} ${this.partition}${this.path}${this.sameSite}${this.secure}`.replace(/(;) {2,}([^ ])/, '$1 $2');
    }
    /**
     * `cookie` 값 반환
     *
     * ```
     * const cookie = new Cookie('name', 'value');
     *
     * Cookie.setCookie(cookie);
     *
     * console.log(Cookie.getCookie('name'));
     * ```
     */
    static getCookie(name) {
        const regex = new RegExp('\\+', 'g'), cookie = document.cookie
            .split('; ')
            .find((...arg) => arg[0].startsWith(name));
        if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(cookie)) {
            return decodeURIComponent(cookie.split('=')[1].replace(regex, encodeURIComponent(' ')));
        }
        else {
            return null;
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
        const expires = cookie.expires.split('=')[1]?.replace(';', ''), maxAge = cookie.maxAge.split('=')[1]?.replace(';', '');
        cookie.setMaxAge(0);
        Cookie.setCookie(cookie);
        cookie.setMaxAge(undefined);
        if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(expires)) {
            cookie.setExpires(new Date(expires));
        }
        if (!_nuka9510_js_util__WEBPACK_IMPORTED_MODULE_0__.JUtil.empty(maxAge)) {
            cookie.setMaxAge(parseInt(maxAge));
        }
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JUtil: () => (/* reexport safe */ _util_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _util_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);




/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Util)
/* harmony export */ });
class Util {
    /**
     * 값이 비어있는지 확인한다.
     *
     * ```
     * // returns true
     * empty(undefined);
     * empty(null);
     * empty(0);
     * empty('');
     * empty([]);
     * empty({});
     * ```
     */
    static empty(
    /** 확인할 값 */ arg) {
        let result = [undefined, null, 0, ''].includes(arg);
        if (!result) {
            if (arg.constructor == Object) {
                result = Object.keys(arg).length == 0 &&
                    Object.keys(Object.getPrototypeOf(arg)).length == 0;
            }
            else if (arg.constructor == NodeList) {
                result = arg.length == 0;
            }
            else if (Array.isArray(arg)) {
                result = arg.length == 0;
            }
        }
        return result;
    }
    /**
     * 값이 숫자인지 확인한다.
     *
     * ```
     * // returns true
     * isNumber(1);
     * isNumber('1');
     *
     * // returns false
     * isNumber('test');
     * isNumber('1', true);
     * ```
     */
    static isNumber(
    /** 확인할 값 */ arg, 
    /** `true`일 경우 `arg`의 `type`도 확인 | #default `false` */ strict = false) {
        let result = !Number.isNaN(Number(arg)) &&
            ['number', 'string'].includes(typeof arg) &&
            !/^\s*$/.test(`${arg}`);
        if (result &&
            strict) {
            result = typeof arg == 'number';
        }
        return result;
    }
    /**
     * 해당 값이 객체인지 확인
     *
     * ```
     * // returns true
     * isObject({});
     *
     * // returns false
     * isObject(undefined);
     * isObject(null);
     * isObject(0);
     * isObject('');
     * isObject([]);
     * ```
     */
    static isObject(
    /** 확인할 값 */ arg) { return arg?.constructor == Object; }
    /**
     * 천 단위 마다 그룹화 된 숫자 형식으로 변환한 문자열을 반환 한다.
     *
     * ```
     * // returns '1,000'
     * numberFormat(1000);
     * numberFormat(1000.01);
     *
     * // returns '1,000.0'
     * numberFormat(1000.01, 1);
     *
     * // returns '1,000 0'
     * numberFormat(1000.01, 1, ' ');
     *
     * // returns '1.000 0'
     * numberFormat(1000.01, 1, ' ', '.');
     * ```
     */
    static numberFormat(
    /** 변환할 숫자 - `number` 타입이 아닌경우 `null` 반환 */ num, 
    /** 소숫점 아래 자리 수 - `number` 타입이 아닌경우 `null` 반환 | #default `0` */ decimals = 0, 
    /** 소수점 구분자 | #default `'.'` */ decimalSeparator = '.', 
    /** 천 단위 구분자 | #default `','` */ thousandsSeparator = ',') {
        if (!Util.isNumber(num, true) ||
            !Util.isNumber(decimals, true)) {
            return null;
        }
        const result = String(num).split('.');
        result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        if (!Util.empty(result[1])) {
            result[1] = result[1].substring(0, decimals);
        }
        return (!Util.empty(result[1])) ? result[0].concat(decimalSeparator, result[1]) : result[0];
    }
    /**
     * 주어진 포맷에 따라 `Date`객체를 문자열로 변환
     *
     * ```
     * const date = new Date(2022, 9, 27);
     *
     * // returns '2022-10-27'
     * strftime(date, '%Y-%m-%d');
     *
     * // returns '2022/10/27'
     * strftime(date, '%Y/%m/%d');
     * ```
     *
     * `%a`: 요일을 축약된 이름으로 - Sun, Mon, …, Sat  \
     * `%A`: 요일을 전체 이름으로 - Sunday, Monday, …, Saturday  \
     * `%d`: 월중 일(day of the month)을 0으로 채워진 10진수로 - 01, 02, …, 31  \
     * `%b`: 월을 축약된 이름으로 - Jan, Feb, …, Dec  \
     * `%B`: 월을 전체 이름으로 - January, February, …, December  \
     * `%m`: 월을 0으로 채워진 10진수로 - 01, 02, …, 12  \
     * `%y`: 세기가 없는 해(year)를 0으로 채워진 10진수로 - 00, 01, …, 99  \
     * `%Y`: 세기가 있는 해(year)를 10진수로 - 0001, 0002, …, 2013, 2014, …, 9998, 9999  \
     * `%H`: 시(24시간제)를 0으로 채워진 십진수로 - 00, 01, …, 23  \
     * `%I`: 시(12시간제)를 0으로 채워진 십진수로 - 01, 02, …, 12  \
     * `%p`: 오전이나 오후에 해당하는 것 - AM, PM  \
     * `%M`: 분을 0으로 채워진 십진수로 - 00, 01, …, 59  \
     * `%S`: 초를 0으로 채워진 10진수로 - 00, 01, …, 59  \
     * `%%`: 리터럴 '%' 문자 - %
     */
    static strftime(
    /** 변환할 `Date`객체 */ date, 
    /** 변활할 포맷 문자열 */ format) {
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        format = format.replace(/(%{1})/g, '\\$1');
        format = format.replace(/(\\%){2}/g, '%');
        format = format.replace(/\\%Y/g, String(date.getFullYear()));
        format = format.replace(/\\%y/g, String(date.getFullYear()).replace(/^\d+(\d{2})$/, '$1'));
        format = format.replace(/\\%B/g, month[date.getMonth()]);
        format = format.replace(/\\%b/g, month[date.getMonth()].replace(/^(\w{3})\w*$/, '$1'));
        format = format.replace(/\\%m/g, String(date.getMonth() + 1).replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%d/g, String(date.getDate()).replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%A/g, week[date.getDay()]);
        format = format.replace(/\\%a/g, week[date.getDay()].replace(/^(\w{3})\w*$/, '$1'));
        format = format.replace(/\\%H/g, String(date.getHours()).replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%I/g, String((date.getHours() > 12) ? (date.getHours() - 12) : date.getHours()).replace(/^0$/, '12').replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%p/g, (date.getHours() < 12) ? 'AM' : 'PM');
        format = format.replace(/\\%M/g, String(date.getMinutes()).replace(/^(\d{1})$/, '0$1'));
        format = format.replace(/\\%S/g, String(date.getSeconds()).replace(/^(\d{1})$/, '0$1'));
        return format;
    }
    /**
     * 유효한 날짜인지 확인
     *
     * ```
     * // returns true
     * checkdate(2022, 10, 28);
     *
     * // returns false
     * checkdate(2022, 10, 32);
     * ```
     */
    static checkdate(
    /** 년 */ year, 
    /** 월 */ month, 
    /** 일 */ day) {
        const date = new Date(year, (month - 1), day);
        return date.getFullYear() == year &&
            (date.getMonth() + 1) == month &&
            date.getDate() == day;
    }
    /**
     * 같은 날짜인지 비교
     *
     * ```
     * const date1 = new Date();
     * const date2 = new Date();
     *
     * // returns true
     * equaldate(date1);
     * equaldate(date1, date2);
     *
     * // returns false
     * date1.setDate(date1.getDate() + 1);
     * date2.setDate(date2.getDate() + 2);
     * equaldate(date1);
     * equaldate(date1, date2);
     * ```
     */
    static equaldate(
    /** 기준 날짜 */ date1, 
    /** 비교할 날짜 | #default `new Date()` */ date2 = new Date()) { return Util.strftime(date1, '%Y-%m-%d') == Util.strftime(date2, '%Y-%m-%d'); }
    /**
     * Date객체에서 해당 하는 요일을 반환한다.
     *
     * ```
     * const date = new Date(2022, 9, 27);
     *
     * // returns '목요일'
     * getWeek(date);
     *
     * // returns '목'
     * getWeek(date, false);
     * ```
     */
    static getWeek(
    /** 요일을 반환할 `Date` 객체 */ date, 
    /** 해당 요일의 약어반환 대한 구분 값 `false`일 경우 약어 반환 | #default `true` */ flag = true) {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'], result = week[date.getDay()];
        return (flag) ? result : result.replace(/^([ㄱ-ㅎㅏ-ㅣ가-힣]{1})[ㄱ-ㅎㅏ-ㅣ가-힣]+$/, '$1');
    }
    /**
     * `Date`객체에 `interval`를 더한 값을 반환한다.
     *
     * ```
     * const date = new Date(2022, 8, 27);
     *
     * // returns '2022-10-28'
     * strftime(util.addDate(date, {month: 1, day: 1}), '%Y-%m-%d');
     * ```
     */
    static addDate(
    /** 기준 `Date`객체 */ date, 
    /** `Date`객체에 계산할 `interval` */ interval) {
        return new Date(date.getFullYear() + (Util.isNumber(interval.year, true) ? interval.year : 0), date.getMonth() + (Util.isNumber(interval.month, true) ? interval.month : 0), date.getDate() + (Util.isNumber(interval.day, true) ? interval.day : 0), date.getHours() + (Util.isNumber(interval.hour, true) ? interval.hour : 0), date.getMinutes() + (Util.isNumber(interval.minute, true) ? interval.minute : 0), date.getSeconds() + (Util.isNumber(interval.second, true) ? interval.second : 0), date.getMilliseconds() + (Util.isNumber(interval.millisecond, true) ? interval.millisecond : 0));
    }
    /**
     * `Date`객체에 `interval`를 뺀 값을 반환한다.
     *
     * ```
     * const date = new Date(2022, 8, 27);
     *
     * // returns '2022-08-26'
     * strftime(util.subDate(date, {month: 1, day: 1}), '%Y-%m-%d');
     * ```
     */
    static subDate(
    /** 기준 `Date`객체 */ date, 
    /** `Date`객체에 계산할 `interval` */ interval) {
        return new Date(date.getFullYear() - (Util.isNumber(interval.year, true) ? interval.year : 0), date.getMonth() - (Util.isNumber(interval.month, true) ? interval.month : 0), date.getDate() - (Util.isNumber(interval.day, true) ? interval.day : 0), date.getHours() - (Util.isNumber(interval.hour, true) ? interval.hour : 0), date.getMinutes() - (Util.isNumber(interval.minute, true) ? interval.minute : 0), date.getSeconds() - (Util.isNumber(interval.second, true) ? interval.second : 0), date.getMilliseconds() - (Util.isNumber(interval.millisecond, true) ? interval.millisecond : 0));
    }
    /**
     * xor 비교
     *
     * ```
     * // returns true
     * xor(true, false);
     * xor(false, true);
     *
     * // returns false
     * xor(true, true);
     * xor(false, false);
     * ```
     */
    static xor(
    /** 비교할 값 1 */ arg1, 
    /** 비교할 값 2 */ arg2) {
        return !(arg1 && arg2) &&
            (arg1 || arg2);
    }
    /**
     * `FormDate`객체에 설정된 값을 `json`문자열로 반환 한다.
     *
     * ```
     * const data = new FormData();
     *
     * data.append('key', value);
     *
     * const json = formDataToJson(data);
     * ```
     */
    static formDataToJson(
    /** `json`문자열로 반환할 `FormData`객체 */ formData) {
        return JSON.stringify(Object.fromEntries([...new Set(formData.keys())].map((...arg) => [
            arg[0],
            (formData.getAll(arg[0]).length > 1)
                ? formData.getAll(arg[0])
                : formData.get(arg[0])
        ])));
    }
    /**
     * 기준 숫자의 백분율 값을 적용했을 경우의 값을 반환한다.
     *
     * ```
     * // returns 10
     * percentage(100, 10);
     * ```
     */
    static percentage(
    /** 기준 숫자 */ num, 
    /** 백분율 */ per) { return num * (per / 100); }
    /**
     * 기준 숫자의 비율 대비 값을 반환한다.
     *
     * ```
     * // returns 8
     * // 1 : 2 = 4 : x
     * ratio([1, 2], 4);
     *
     * // returns 2
     * // 1 : 2 = x : 4
     * ratio([1, 2], 4, false);
     * ```
     */
    static ratio(
    /** 비율 */ ratio, 
    /** 기준 숫자 */ num, 
    /** 비율 적용 기준 | #default `true` */ flag = true) {
        const index = flag
            ? [1, 0]
            : [0, 1];
        return (num * ratio[index[0]]) / ratio[index[1]];
    }
    /**
     * `x` 번째의 항이 `a`이고 공차가 `d`인 등차수열의 `n` 번째 항을 반환 한다.
     */
    static arithmeticSequence(
    /** 기준 항 */ a, 
    /** 기준 위치 `x > 0`인 정수 */ x, 
    /** 공차 */ d, 
    /** 반환 위치 */ n) { return a + ((n - x) * d); }
    /**
     * `x` 번째의 항이 `a`이고 공비가 `r`인 등비수열의 `n` 번째 항을 반환 한다.
     */
    static geometricSequence(
    /** 기준 항 */ a, 
    /** 기준 위치 `x > 0`인 정수 */ x, 
    /** 공비 */ r, 
    /** 반환 위치 */ n) { return (a / (r ** (x - 1))) * (r ** (n - 1)); }
    /**
     * `value`를 반올림(round), 내림(floor), 올림(ceil) 한 값을 반환한다.
     */
    static decimalAdjust(
    /** 구분 기준 `반올림(round)`, `내림(floor)`, `올림(ceil)` */ type, 
    /** 기준 값 */ value, 
    /** 소숫점 아래 자리 수 | #default `0` */ exp = 0) {
        const [m, n = '0'] = value.toString().split('e'), adjustValue = Math[type](Number(`${m}e${parseInt(n) + exp}`)), [nm, nn = '0'] = adjustValue.toString().split('e');
        return Number(`${nm}e${parseInt(nn) - exp}`);
    }
    /**
     * html entity를 인코딩 한다.
     */
    static encodeHtmlEntity(
    /** html entity를 인코딩 할 문자열 */ arg) {
        const textarea = document.createElement('textarea');
        textarea.innerText = arg;
        return textarea.innerHTML;
    }
    /**
     * html entity를 디코딩 한다.
     */
    static decodeHtmlEntity(
    /** html entity를 디코딩 할 문자열 */ arg) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = arg;
        return textarea.innerText;
    }
    /**
     * `Object`의 `deepCopy`를 반환 한다.
     */
    static copy(
    /** `deepCopy`할 `object` */ arg) {
        if (Util.isObject(arg)) {
            const result = {};
            for (const i in arg) {
                result[i] = Util.copy(arg[i]);
            }
            return result;
        }
        else if (Array.isArray(arg)) {
            const result = [];
            for (const i of arg) {
                result.push(Util.copy(i));
            }
            return result;
        }
        else {
            return arg;
        }
    }
    /**
     * `sNum` <= x <= `eNum` 범위의 배열을 반환한다.
     */
    static numRange(
    /** 시작 값 */ sNum, 
    /** 종료 값 */ eNum) {
        let range = (eNum - sNum);
        const flag = (range > 0);
        range = Math.abs(range) + 1;
        return [...new Array(range)].map((...arg) => (arg[1] * ((flag) ? 1 : -1)) + sNum);
    }
    /**
     * `size`를 크기로 하는 `chunk`를 담은 배열을 반환한다.
     */
    static arrayChunk(
    /** 기준 배열 */ arr, 
    /** `chunk`의 크기 (`size > 0`인 정수) */ size) {
        if (!Util.isNumber(size, true)) {
            throw new TypeError("size는 숫자 타입 이어야 합니다.");
        }
        if (size <= 0 &&
            Number.isInteger(size)) {
            throw new RangeError("size는 0보다 큰 정수여야 합니다.");
        }
        const _arr = [];
        Util.numRange(0, Util.decimalAdjust('ceil', arr.length / size) + ((arr.length > 0) ? -1 : 0))
            .forEach((...arg) => { _arr.push(arr.slice(arg[0] * size, (arg[0] + 1) * size)); });
        return _arr;
    }
}


/***/ })
/******/ 	]);
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
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cookie: () => (/* reexport safe */ _cookie_mjs__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   JUtil: () => (/* reexport safe */ _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_1__.JUtil)
/* harmony export */ });
/* harmony import */ var _cookie_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _nuka9510_js_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);




})();

simpleCookie = __webpack_exports__;
/******/ })()
;