import { JUtil } from "@nuka9510/js-util";
/**
 * `WebBrowser`에서 `Cookie`를 다루기 위한 객체
 */
export default class Cookie {
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
     ** `Strict`
     * 브라우저가 동일한 사이트 요청에만 쿠키를 전송한다는 것을 의미합니다. 즉, 쿠키를 설정한 동일한 사이트에서 발생하는 요청에만 쿠키를 전송합니다. 만약 다른 도메인 또는 같은 도메인의 스키마에서 발생하는 요청이라면 `SameSite=Strict` 속성이 있는 쿠키는 전송되지 않습니다.
     ** `Lax`
     * 이미지 또는 프레임을 불러오는 요청과 같은 사이트 간 요청은 쿠키가 전송되지 않는 것을 의미합니다. 하지만 사용자가 링크를 따라갈 때처럼 외부 사이트에서 원래 사이트로 이동할 때는 쿠키를 전송합니다. 이것은 `SameSite` 속성이 명시되지 않았으면 기본 값으로 동작합니다.
     ** `None`
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
     * `Cookie`에 저장할 `cookie-name`, `cookie-value`
     */
    constructor(
    /** `cookie-name` */ name, 
    /** `cookie-value` #default `''` */ value = '') {
        if (JUtil.empty(name)) {
            throw new Error(`'name'이 비어있습니다.`);
        }
        this.#name = name;
        this.#value = value;
    }
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
     ** `Strict`
     * 브라우저가 동일한 사이트 요청에만 쿠키를 전송한다는 것을 의미합니다. 즉, 쿠키를 설정한 동일한 사이트에서 발생하는 요청에만 쿠키를 전송합니다. 만약 다른 도메인 또는 같은 도메인의 스키마에서 발생하는 요청이라면 `SameSite=Strict` 속성이 있는 쿠키는 전송되지 않습니다.
     ** `Lax`
     * 이미지 또는 프레임을 불러오는 요청과 같은 사이트 간 요청은 쿠키가 전송되지 않는 것을 의미합니다. 하지만 사용자가 링크를 따라갈 때처럼 외부 사이트에서 원래 사이트로 이동할 때는 쿠키를 전송합니다. 이것은 `SameSite` 속성이 명시되지 않았으면 기본 값으로 동작합니다.
     ** `None`
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
        const regex = new RegExp(encodeURIComponent(' '), 'g'), value = encodeURIComponent(this.#value).replace(regex, '+');
        return `${this.#name}=${value};${JUtil.empty(this.#domain) ? '' : ` Domain=${this.#domain};`}${JUtil.empty(this.#expires) ? '' : ` Expires=${this.#expires.toUTCString()};`}${(this.#httpOnly) ? ' HttpOnly;' : ''}${JUtil.isNumber(this.#maxAge, true) ? ` Max-Age=${this.#maxAge};` : ''}${(this.#partition) ? ' Partitioned;' : ''}${JUtil.empty(this.#path) ? '' : ` Path=${this.#path};`}${JUtil.empty(this.#sameSite) ? '' : ` SameSite=${this.#sameSite};`}${(this.#secure) ? ' Secure;' : ''}`;
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
        if (!JUtil.empty(cookie)) {
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
     * Cookie.popCookie('name');
     * ```
     */
    static popCookie(name) {
        const cookie = new Cookie(name);
        cookie.setMaxAge(0);
        Cookie.setCookie(cookie);
    }
}
