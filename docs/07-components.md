# 07. Components — 컴포넌트

## GospelFix 프로필 — 실제 값

```
## Components
- 주 버튼(.contact-button, .qr-sheet-save-btn) — --primary(#14151A) 배경 + --primary-foreground(#FFFFFF) 글자,
  모서리 16px(--radius), 높이 44px 이상, 화면당 하단에 고정 하나 + 시트 내부 하나(동시 노출 안 됨)
- 보조 버튼(.qr-trigger-button) — 흰 배경 + 글자 기본 + 테두리 1px(--border-strong), 주 버튼과 같은 높이
- 카드(.card, .ministry-card-link) — 표면(#FFFFFF) 배경, 모서리 14px(--radius-lg), 테두리 1px, 그림자 없음, 안쪽 여백 18~20px
- 입력창 — 없음 (이 프로젝트에는 폼/입력 요소가 없다)
- 배지/칩(.tag, .hero-tag) — 기본 옅은 배경(--secondary #EEF0F3) + 글자 기본, 모서리 6px/10px, 선택 상태 없음(정보 표시 전용)
```

## 아이콘 라이브러리

- **Lucide** (`https://cdn.jsdelivr.net/npm/lucide@1/dist/umd/lucide.js`, jsDelivr 메이저 버전 고정) — `<i data-lucide="이름">` + `lucide.createIcons()`로 하이드레이션
- 사용 중인 이름: `chevron-right`(리스트 화살표), `chevron-left`(뒤로가기), `share-2`(공유), `qr-code`(QR 트리거), `x`(닫기), `mail`, `phone`, `external-link`, `globe`(히어로 액션)
- 커스텀 SVG를 새로 그리지 않고, 반드시 Lucide 아이콘 이름에서 고른다

## 값을 정할 때 참고

| 컴포넌트 | 배경 | 글자 | 모서리 | 테두리/그림자 |
|---|---|---|---|---|
| 주 버튼 | `--primary` (`#14151A`) | `--primary-foreground` (`#FFFFFF`) | `--radius` (16px) | 그림자만 (06번) |
| 보조 버튼 | `--card` (`#FFFFFF`) | `--foreground` | `--radius` (16px) | 테두리 1px + 그림자 |
| 카드 | `--card` (`#FFFFFF`) | `--foreground` | `--radius-lg` (14px) | 테두리 1px, 그림자 없음 |
| 배지/칩 | `--secondary` (`#EEF0F3`) | `--foreground` | `--radius-sm`/`--radius-md` | 없음 |
| Bottom Sheet | `--card` | `--foreground` | `--radius-xl` (20px, 상단만) | 그림자 진하게 |

- **화면당 주 버튼 규칙**: 하단 고정 영역에 "프로필 공유하기" 하나. Bottom Sheet가 열렸을 때만 그 안의 "이미지로 저장" 버튼이 추가로 보이지만, 이때 배경 버튼은 시트에 가려지므로 실질적으로 동시에 하나만 활성화된다.
- **위험 버튼**: 없음 (삭제/취소 등 되돌릴 수 없는 액션이 없는 정적 프로필 페이지).
- **버튼/카드 높이 통일**: 주 버튼·보조 버튼 모두 44px 이상(터치 영역 규칙과 동일 기준).

## 참고 CSS 스니펫 (구 `design-system.md`에서 이관, 실제 구현 기준으로 정리)

### 프로필 히어로 이미지

`mode="classic"`에서 사용하는, 사진이 상단을 채우고 카드가 아래로 겹치는 레이아웃(실제 구현: `.profile-hero-image` + `.profile-hero-card`).

```css
.profile-hero-image {
  width: 100%;
  aspect-ratio: 1122 / 1402; /* 참조 인물 사진 원본 비율 */
  overflow: hidden;
}

.profile-hero-card {
  margin-top: -28px; /* 사진 하단과 겹치는 오버랩 카드 */
  background: var(--card);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}
```

### 토스트 등장 애니메이션

`.toast`(06번 참고: 진한 그림자, 화면을 덮는 레이어)의 실제 트랜지션.

```css
.toast {
  transform: translateX(-50%) translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;
}

.toast.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
```

## 체크리스트
- [x] 다섯 개 기본 컴포넌트를 모두 채웠는가 — 입력창은 "없음"으로 명시
- [x] "화면당 하나만" 같은 사용 조건을 명시했는가
- [x] 여기서 새로운 색이나 크기를 만들지 않았는가 — 02, 05번 값만 재사용
- [x] 안 쓰는 속성을 "없음"이라고 적었는가
- [x] 버튼과 입력창의 높이가 같은가 — 입력창 없음, 버튼끼리는 44px로 통일
