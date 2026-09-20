# MVP 단계 개발 규칙

> HTML5 + CSS3 + Vanilla JS 기반 MVP 개발 시 적용하는 규칙입니다.

---

## 기술 스택

> 📁 참조: `@docs/mvp-stack.yaml`

---

## 파일 구조

```
/
├── index.html          # 메인 페이지
├── css/
│   └── style.css       # 스타일
├── js/
│   ├── app.js          # 메인 로직
│   └── api.js          # API 통신
└── assets/
    └── images/         # 이미지 리소스
```

---

## HTML 규칙

- 시맨틱 태그 사용 (`<header>`, `<main>`, `<section>`, `<footer>`)
- 접근성 속성 필수 (`alt`, `aria-label`)
- 모바일 viewport 설정

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

## CSS 규칙

- 모바일 우선 (max-width 미디어쿼리)
- 폰트 크기: `clamp()` 사용 (어르신 가독성)
- 버튼/터치 영역: 최소 44px
- CSS 변수로 색상/크기 관리

```css
:root {
  --color-primary: #2563eb;
  --color-text: #1f2937;
  --font-size-base: clamp(16px, 4vw, 20px);
  --touch-min: 44px;
}
```

---

## JavaScript 규칙

- ES6+ 문법 사용
- 전역 변수 최소화
- 모듈 패턴 또는 IIFE 사용
- async/await로 비동기 처리

```javascript
// 모듈 패턴 예시
const App = (() => {
  const state = {
    /* ... */
  };

  const init = () => {
    /* ... */
  };
  const handleUpload = async (file) => {
    /* ... */
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", App.init);
```

---

## API 연동 (Gemini Flash)

```javascript
const analyzeMenu = async (imageBase64) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: ANALYZE_PROMPT },
              { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
            ],
          },
        ],
      }),
    },
  );
  return response.json();
};
```

---

## ⚠️ 절대 하지 말 것

- [ ] API 키를 JS 파일에 하드코딩
- [ ] document.write() 사용
- [ ] innerHTML로 사용자 입력 삽입 (XSS 위험)
- [ ] 동기식 XMLHttpRequest 사용
- [ ] 이미지 용량 검증 없이 업로드

---

## ✅ 반드시 할 것

- [x] API 키는 환경변수 또는 서버 프록시 사용
- [x] 이미지 업로드 전 용량/형식 검증 (5MB 이하, jpg/png)
- [x] 로딩 스피너 표시
- [x] 에러 시 사용자 친화적 알림
- [x] 폼 제출 시 버튼 비활성화 (중복 방지)
- [x] console.log 배포 전 제거
