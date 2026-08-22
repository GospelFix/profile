# 디자인 시스템

> 개발자 웹 이력서 프로젝트의 통합 디자인 가이드 (Light Theme)

---

## 목차

1. [개요](#개요)
2. [레이아웃](#레이아웃)
3. [아이콘](#아이콘)
4. [주요 기능](#주요-기능)
5. [디자인 토큰](#디자인-토큰)
6. [컴포넌트 스타일](#컴포넌트-스타일)

---

## 개요

이 문서는 프로젝트의 디자인 시스템을 정의합니다.
**라이트 테마** 기반으로 색상, 타이포그래피, 스페이싱, 컴포넌트 스타일을 포함합니다.

프로필 히어로(사진 + 오버랩 카드), 아이콘 없는 플랫 리스트(연락처/소셜) 레이아웃은 참고 레퍼런스 이미지를 기준으로 함.

---

## 레이아웃

### 반응형 Breakpoints

| 디바이스 | 너비     |
| -------- | -------- |
| Mobile   | ~ 390px  |
| Tablet   | 768px ~  |
| Desktop  | 1200px ~ |

### 기본 설정

- **모바일 우선**: 기본 최대 너비 390px
- **태블릿**: 768px 이상에서 카드형 레이아웃
- **데스크톱**: 1200px 이상에서 확대된 레이아웃, 좌측 여백에 블러 처리된 파란색 원형 장식 효과(`body::before`, `float` 애니메이션)
- **배경**: 라이트 그레이 (`#f4f5f7`)

---

## 아이콘

- 인라인 SVG 사용
- 외부 아이콘 라이브러리 없음
- 연락처/소셜 리스트는 아이콘 없이 라벨+값+화살표만 있는 플랫 리스트로 구성 (구 버전의 컬러 아이콘 박스 패턴 폐기)

---

## 주요 기능

### 프로필 공유

- Web Share API 지원 시: 네이티브 공유
- 미지원 시: 클립보드 복사 폴백

### 토스트 알림

- DOM에 동적 생성
- 자동 사라짐 (3초)
- 라이트 테마: 어두운(`--color-text`) 배경 + 흰색 텍스트로 배경과 대비 확보

### 이미지 폴백

- 프로필 이미지 로드 실패 시 SVG 플레이스홀더 표시

### 섹션별 애니메이션

- fadeIn 애니메이션으로 순차 등장 효과

---

## 디자인 토큰

> 라이트 테마 색상, 타이포그래피, 스페이싱 정의

### 색상

| 용도          | 변수명                   | 색상코드                    |
| ------------- | ------------------------ | --------------------------- |
| 배경          | `--color-bg`             | `#f4f5f7`                   |
| 카드/표면 배경 | `--color-surface`       | `#ffffff`                   |
| 칩/태그 배경   | `--color-chip-bg`       | `#eef0f3`                   |
| 테두리        | `--color-border`         | `rgba(20, 21, 26, 0.08)`    |
| 테두리 (강조) | `--color-border-strong`  | `rgba(20, 21, 26, 0.14)`    |
| 텍스트        | `--color-text`           | `#14151a`                   |
| 보조 텍스트   | `--color-text-secondary` | `rgba(20, 21, 26, 0.55)`    |
| 비활성 텍스트 | `--color-text-muted`     | `rgba(20, 21, 26, 0.35)`    |

액센트 컬러 팔레트는 사용하지 않음 — 컬러 아이콘 박스를 제거하고 흑백 위주의 편집 디자인으로 전환했기 때문. 유일한 색 포인트는 데스크톱(1200px+) 배경에 표시되는 파란색 블러 장식 효과(`body::before`, `float` 애니메이션)뿐.

### 타이포그래피

#### 폰트 패밀리

```css
font-family:
  "Pretendard",
  "Inter",
  -apple-system,
  BlinkMacSystemFont,
  "Apple SD Gothic Neo",
  sans-serif;
```

- `assets/fonts/Pretendard-*.woff2`를 `@font-face`로 로컬 번들 (400/500/600/700/800 웨이트). 한글 최적화 + 외부 네트워크 요청 없음.
- Inter/시스템 폰트는 폴백으로만 유지.

#### 폰트 크기

| 토큰          | 크기 | 용도              |
| ------------- | ---- | ----------------- |
| `--text-xs`   | 10px | 태그, 배지        |
| `--text-sm`   | 12px | 캡션, 보조 텍스트 |
| `--text-md`   | 13px | 본문 보조         |
| `--text-base` | 15px | 본문 기본         |
| `--text-lg`   | 16px | 강조 본문         |
| `--text-xl`   | 20px | 소제목 (h3)       |
| `--text-2xl`  | 24px | 중제목 (h2)       |

#### 폰트 웨이트

| 토큰              | 값  | 용도       |
| ----------------- | --- | ---------- |
| `--font-regular`  | 400 | 본문 기본  |
| `--font-medium`   | 500 | 약간 강조  |
| `--font-semibold` | 600 | 제목, 강조 |
| `--font-bold`     | 700 | 강한 강조  |

#### 줄 간격

| 토큰              | 값   | 용도        |
| ----------------- | ---- | ----------- |
| `--leading-tight` | 1.25 | 제목        |
| `--leading-snug`  | 1.4  | 짧은 텍스트 |
| `--leading-base`  | 1.5  | 본문 기본   |
| `--leading-loose` | 1.7  | 긴 본문     |

### 스페이싱 시스템

> 4px 베이스 스케일 사용

| 토큰         | 값   | 용도                |
| ------------ | ---- | ------------------- |
| `--space-1`  | 4px  | 아이콘-텍스트 간격  |
| `--space-2`  | 8px  | 요소 내부 작은 여백 |
| `--space-3`  | 12px | 요소 내부 중간 여백 |
| `--space-4`  | 16px | 요소 간 기본 간격   |
| `--space-5`  | 20px | 그룹 간 간격        |
| `--space-6`  | 24px | 섹션 내부 여백      |
| `--space-8`  | 32px | 섹션 간 간격        |
| `--space-10` | 40px | 큰 섹션 구분        |
| `--space-12` | 48px | 페이지 여백         |

#### 컨테이너 패딩

```css
/* 모바일 */
padding: var(--space-4); /* 16px */

/* 데스크톱 */
padding: var(--space-6); /* 24px */
```

### CSS 변수 정의

> 복사하여 사용

```css
:root {
  /* 색상 - 라이트 테마 */
  --color-bg: #f4f5f7;
  --color-surface: #ffffff;
  --color-chip-bg: #eef0f3;
  --color-border: rgba(20, 21, 26, 0.08);
  --color-border-strong: rgba(20, 21, 26, 0.14);
  --color-text: #14151a;
  --color-text-secondary: rgba(20, 21, 26, 0.55);
  --color-text-muted: rgba(20, 21, 26, 0.35);

  /* 타이포그래피 */
  --text-xs: 10px;
  --text-sm: 12px;
  --text-md: 13px;
  --text-base: 15px;
  --text-lg: 16px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 28px;

  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  --leading-tight: 1.25;
  --leading-snug: 1.4;
  --leading-base: 1.5;
  --leading-loose: 1.7;

  /* 스페이싱 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* 반경 */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
  --radius-full: 50%;
}
```

---

## 컴포넌트 스타일

> 다크 테마 UI 컴포넌트 스타일 가이드

### 버튼

#### Primary 버튼 (다크, 실제 예시: `.contact-button`)

```css
.btn-primary {
  background: var(--color-text);
  color: var(--color-surface);
  padding: var(--space-4) var(--space-6); /* 16px 24px */
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  min-height: 44px;
  transition: all 0.2s ease;
}

.btn-primary:active {
  transform: scale(0.98);
}
```

#### Secondary 버튼 (투명)

```css
.btn-secondary {
  background: var(--color-chip-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  min-height: 44px;
}

.btn-secondary:hover {
  background: var(--color-border-strong);
}
```

#### Ghost 버튼

```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
}

.btn-ghost:hover {
  background: var(--color-chip-bg);
  color: var(--color-text);
}
```

### 카드

```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
```

### 리스트 아이템

> 실제 구현(`assets/css/style.css`의 `.list-item`)은 아이콘 없이 라벨(왼쪽)+값(오른쪽, bold)+화살표로 구성되고, 카드 내부에서 divider(`border-bottom`)로 구분한다. 개별 항목마다 배경/테두리를 두르지 않는다.

```css
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
  min-height: 44px;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:active {
  background: var(--color-chip-bg);
}
```

### 아이콘 박스 (폐기됨)

과거 다크 테마에서는 연락처/소셜 항목마다 컬러 아이콘 박스(`.icon-box.email`, `.icon-box.kakao` 등)를 사용했으나, 라이트 테마 전환과 함께 제거되었다. 항목 구분은 라벨 텍스트만으로 한다.

### 배지 / 칩

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  background: var(--color-chip-bg);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
}
```

### 링크

```css
.link {
  color: var(--color-text);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.link:hover {
  opacity: 0.8;
}
```

### 구분선

```css
.divider {
  height: 1px;
  background: var(--color-border);
  margin: var(--space-6) 0;
}
```

### 입력 필드

```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  color: var(--color-text);
  min-height: 44px;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--color-border-strong);
  box-shadow: 0 0 0 3px rgba(20, 21, 26, 0.08);
}

.input::placeholder {
  color: var(--color-text-muted);
}
```

### 토스트

> 페이지 배경이 밝기 때문에 토스트는 반대로 어두운 배경 + 흰 텍스트로 대비를 확보한다 (실제 구현: `.toast`).

```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-text);
  color: var(--color-surface);
  padding: 14px 24px;
  border-radius: var(--radius-lg);
  font-size: var(--text-md);
  font-weight: var(--font-medium);
  box-shadow: 0 4px 12px rgba(20, 21, 26, 0.2);
  animation: toast-in 0.3s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
```

### 프로필 히어로 이미지

> 기존 원형 아바타(`.profile-image`) 대신, 사진이 상단 전체를 채우고 그 아래 카드가 겹쳐지는 히어로 레이아웃을 사용한다 (실제 구현: `.profile-hero-image` + `.profile-hero-card`).

```css
.profile-hero-image {
  width: 100%;
  aspect-ratio: 1122 / 1402; /* 참조 인물 사진 원본 비율 */
  overflow: hidden;
}

.profile-hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.profile-hero-card {
  margin-top: -28px; /* 사진 하단과 겹치는 오버랩 카드 */
  background: var(--color-surface);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}
```
