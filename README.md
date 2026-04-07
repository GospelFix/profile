# 소윤호 | GospelFix 대표 — 개인 프로필 페이지

AI AGENT 자동화 솔루션 전문가 소윤호의 개인 프로필 정적 사이트.

**라이브**: https://gospelfix.github.io/profile/

---

## 기술 스택

- **HTML5 + CSS3 + Vanilla JS (ES6+)** — 빌드 도구 없음
- **Swiper v11** — 카드 슬라이더 (CDN)
- **Google Fonts** — Inter
- **GitHub Pages** — `main` 브랜치 push 시 자동 배포

---

## 로컬 실행

```bash
# Python
python3 -m http.server 8080

# Node.js
npx serve .
```

> `fetch()`로 JSON을 로드하므로 `file://` 프로토콜은 CORS 오류가 발생합니다. 반드시 로컬 서버로 확인하세요.

---

## 프로젝트 구조

```
profile/
├── index.html                  # 단일 페이지
├── assets/
│   ├── css/style.css           # 전체 스타일 (모바일 우선)
│   ├── js/
│   │   ├── app.js              # App 모듈 — 공유, 토스트, 이미지 폴백
│   │   └── cards.js            # CardsModule — JSON → Swiper 카드 렌더링
│   ├── data/
│   │   ├── ministry-cards.json # 사역 카드 데이터
│   │   └── portfolio-cards.json# 포트폴리오 카드 데이터
│   └── images/                 # 이미지 리소스
└── .github/workflows/static.yml# GitHub Pages 자동 배포
```

---

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 GitHub Pages에 배포합니다.
