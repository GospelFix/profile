# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 프로젝트 개요

소윤호 / GospelFix 대표의 개인 프로필 페이지. HTML5 + CSS3 + Vanilla JS(ES6+) 기반 정적 사이트.
배포: GitHub Pages (`main` 브랜치 push 시 자동 배포 → `.github/workflows/static.yml`)

---

## 로컬 실행

빌드 도구 없음. 브라우저에서 직접 열거나 로컬 서버 사용:

```bash
# Python 사용 시
python3 -m http.server 8080

# Node.js 사용 시
npx serve .
```

> `fetch()`로 JSON을 로드하므로 `file://` 프로토콜은 CORS 오류 발생. 반드시 로컬 서버로 확인.

빌드/린트/테스트 도구 없음 (`package.json` 없음). 검증은 로컬 서버 구동 후 브라우저 확인이 유일한 방법.

---

## 아키텍처

### 전체 구조

단일 `index.html` 페이지. JS는 네 개의 IIFE 모듈로 분리되며, `index.html` 하단에서 **고정된 순서**로 로드·초기화된다(순서가 바뀌면 깨짐):

1. **`assets/js/hero.js`** — `HeroModule`. `mode` prop(`classic` | `gradient`, 기본 `gradient`)에 따라 히어로 영역(`#profileHero`)을 통째로 렌더링. 로드 직후 `HeroModule.init()`을 인라인 스크립트로 즉시 호출.
2. **`assets/js/app.js`** — `App` 모듈. DOM 초기화, 프로필 공유(Web Share API / 클립보드 폴백), 토스트 알림, 프로필 이미지 폴백 처리. `cacheDOM()`이 `.hero-share-trigger` 등 **HeroModule이 렌더링한 엘리먼트**를 조회하므로, hero.js가 먼저 실행되어 DOM에 해당 요소가 존재해야 한다 — 이 순서 의존성 때문에 `app.js`는 반드시 `hero.js` 다음에 로드한다.
3. **`assets/js/qr.js`** — `QRModule`. 프로필 공유 QR코드를 Bottom Sheet로 표시. `qrcode` CDN으로 canvas에 직접 그리므로 URL이 외부 서버로 전송되지 않음.
4. **`assets/js/cards.js`** — `CardsModule`. JSON 데이터를 `fetch()`로 로드해 Swiper 슬라이드 카드로 렌더링. XSS 방지를 위해 `escapeHtml()` 사용.

**하드코딩된 공유 URL**: `app.js`의 `shareData.url`과 `qr.js`의 `PROFILE_URL`은 둘 다 `window.location.href`가 아니라 배포 주소(`https://gospelfix.github.io/profile/`)로 하드코딩되어 있다. 로컬 서버(`localhost:8080` 등)에서 테스트할 때 주소가 그대로 유출되는 걸 막기 위한 의도적 선택이므로, "동적으로 현재 URL을 쓰도록" 리팩터하지 않는다.

### 카드 데이터 흐름

```
assets/data/*.json  →  CardsModule.loadCards()  →  Swiper 슬라이드 DOM 생성
```

- `assets/data/ministry-cards.json` → `#ministryCards` 컨테이너 → `.ministry-swiper`
- `assets/data/portfolio-cards.json` → `#portfolioCards` 컨테이너 → `.portfolio-swiper`

**중요**: JSON의 `imageUrl` 경로는 `index.html` 기준 상대 경로로 작성 (e.g. `./assets/images/cards/thumbnail-1.png`). JSON 파일이 `assets/data/` 안에 있더라도 브라우저가 해석하는 기준은 항상 HTML 파일 위치.

### 외부 의존성 (CDN)

- **Swiper v11** — 카드 슬라이더 (`swiper-bundle.min.css` / `swiper-bundle.min.js`)
- **Lucide** — 아이콘. `data-lucide="..."` 속성을 마크업에 넣고 `lucide.createIcons()`를 호출해야 실제 SVG로 치환됨. `HeroModule`은 아이콘 마크업만 삽입하고 직접 호출하지 않으며, `index.html`의 인라인 스크립트가 `HeroModule.init()` 직후 `lucide.createIcons()`를 한 번 호출해 치환함. `QRModule`은 Bottom Sheet가 지연 렌더링되므로 자체적으로 `lucide.createIcons()`를 다시 호출함
- **QRCode.js** — `qr.js`에서 QR 캔버스 생성
- **Google Analytics** — `G-B8HHTC2RFX`

폰트는 CDN이 아니라 `assets/fonts/Pretendard-*.woff2`를 `@font-face`로 로컬 번들 (Google Fonts Inter 링크는 제거됨, Inter는 폴백으로만 스택에 남음).

### 예외: `pages/life.html`

독립된 인생 그래프 페이지로, `index.html`의 IIFE/모듈 규칙을 따르지 않는 별도 스크립트 조각(Chart.js CDN, 전역 함수 + `onclick` 핸들러)이다. `index.html`에서 링크로 연결되지 않는 별도 산출물이므로, 이 페이지를 수정할 때는 위 아키텍처 규칙을 강제하지 않아도 된다.

---

## 개발 규칙

- JS 모듈 패턴: IIFE (`const Module = (() => { ... })();`) — 전역 변수 금지, 퍼블릭 API만 노출
- 사용자 입력을 innerHTML에 삽입할 때 반드시 `escapeHtml()` 통과
- CSS: 모바일 우선, `clamp()`로 폰트 크기, 터치 영역 최소 44px, CSS 변수로 색상/크기 관리
- 색상/타이포/스페이싱 CSS 변수의 정의와 용도는 `docs/design.md`(요약) 및 `docs/02-colors.md`~`docs/09-shadcn-tokens.md`(근거) 참조 (라이트 테마 고정, `--color-bg: #f4f5f7`)
- 이미지는 `assets/images/` 하위에 위치. 신규 카드 썸네일은 `.avif`로 추가하는 추세(용량 절감, Safari 16+/Chrome/Firefox 전체 지원) — 기존 jpg/png 파일을 교체할 때는 참조하는 모든 JSON의 `imageUrl` 확장자도 함께 바꿔야 함

---

## 커밋 컨벤션

`<이모지> <영문 접두사>: <한글 설명>` 형식 (예: `✨ Feat: 카카오 채널 클릭 시 앱 딥링크 연결`, `🐛 Fix: 카드 썸네일 이미지 경로 수정`). 접두사별 이모지: `Feat`→✨, `Fix`→🐛, `Refactor`→♻️, `Style`→💄, `Docs`→📝, `File`(에셋 추가/교체)→🗂️, `Update`→🔧.

변경 사항을 전부 한 커밋에 몰아넣지 않고, 의미 단위(같은 기능/버그 수정/콘텐츠 갱신)로 나눠서 커밋한다.

**커밋/push 전 필수 절차**: 반드시 `senior-code-reviewer` 서브에이전트로 코드 리뷰를 먼저 진행한 뒤에만 커밋/push를 진행한다. 리뷰에서 지적된 문제는 수정 후 다시 검토를 거쳐야 하며, 리뷰를 생략하고 바로 커밋/push하지 않는다.
