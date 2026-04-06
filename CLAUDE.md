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

---

## 아키텍처

### 전체 구조

단일 `index.html` 페이지. JS는 두 개의 IIFE 모듈로 분리:

- **`assets/js/app.js`** — `App` 모듈. DOM 초기화, 프로필 공유(Web Share API / 클립보드 폴백), 토스트 알림, 프로필 이미지 폴백 처리.
- **`assets/js/cards.js`** — `CardsModule`. JSON 데이터를 `fetch()`로 로드해 Swiper 슬라이드 카드로 렌더링. XSS 방지를 위해 `escapeHtml()` 사용.

### 카드 데이터 흐름

```
assets/data/*.json  →  CardsModule.loadCards()  →  Swiper 슬라이드 DOM 생성
```

- `assets/data/ministry-cards.json` → `#ministryCards` 컨테이너 → `.ministry-swiper`
- `assets/data/portfolio-cards.json` → `#portfolioCards` 컨테이너 → `.portfolio-swiper`

**중요**: JSON의 `imageUrl` 경로는 `index.html` 기준 상대 경로로 작성 (e.g. `./assets/images/cards/thumbnail-1.png`). JSON 파일이 `assets/data/` 안에 있더라도 브라우저가 해석하는 기준은 항상 HTML 파일 위치.

### 외부 의존성 (CDN)

- **Swiper v11** — 카드 슬라이더 (`swiper-bundle.min.css` / `swiper-bundle.min.js`)
- **Google Fonts** — Inter 폰트
- **Google Analytics** — `G-B8HHTC2RFX`

---

## 개발 규칙

- JS 모듈 패턴: IIFE (`const Module = (() => { ... })();`) — 전역 변수 금지, 퍼블릭 API만 노출
- 사용자 입력을 innerHTML에 삽입할 때 반드시 `escapeHtml()` 통과
- CSS: 모바일 우선, `clamp()`로 폰트 크기, 터치 영역 최소 44px, CSS 변수로 색상/크기 관리
- 이미지는 `assets/images/` 하위에 위치
