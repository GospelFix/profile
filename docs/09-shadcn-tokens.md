# 09. CSS 변수 토큰 — 코드로 내보내는 칸

02~07에서 정한 값을 shadcn/ui 변수 이름 규약으로 옮긴 것. 실제 코드(`assets/css/style.css`)는 기존 `--color-*` 네이밍을 그대로 유지한다 — 아래 매핑은 shadcn 컴포넌트를 실제로 가져다 쓰게 될 때를 위한 **참조 문서**이며, 지금 당장 코드를 참조하는 곳이 없는 별칭을 CSS에 미리 깔아두지 않는다(이 프로젝트는 빌드 도구 없는 1인 유지보수 MVP라 "쓰이지 않는 변수 이름 체계"가 하나 더 늘면 유지보수 비용만 커진다). 실제 CSS에 존재하는 건 아래 중 **`--radius`(파생값 포함)와 `--ring`뿐**이다 — 나머지는 필요해지는 시점에 이 표를 그대로 옮겨 쓴다.

## 채운 칸

```css
:root {
  --radius: 16px;

  --background: #f4f5f7;           /* = var(--color-bg) */
  --foreground: #14151a;           /* = var(--color-text) */

  --card: #ffffff;                 /* = var(--color-surface) */
  --card-foreground: #14151a;

  --popover: #ffffff;
  --popover-foreground: #14151a;

  --primary: #14151a;              /* 무채색 자체가 포인트 색 */
  --primary-foreground: #ffffff;

  --secondary: #eef0f3;            /* = var(--color-chip-bg) */
  --secondary-foreground: #14151a;

  --muted: #eef0f3;
  --muted-foreground: rgba(20, 21, 26, 0.55);  /* = var(--color-text-secondary) */

  --accent: #eef0f3;
  --accent-foreground: #14151a;

  --destructive: #dc2626;          /* 현재 미사용 — 삭제/취소 액션 추가 시에만 사용 */
  --destructive-foreground: #ffffff;

  --border: rgba(20, 21, 26, 0.08);
  --input: rgba(20, 21, 26, 0.14); /* = var(--color-border-strong), 입력 요소 없음 — 향후 대비 정의만 유지 */
  --ring: #14151a;
}

/* chart/sidebar 블록 삭제 — 대시보드·사이드바 없음 */
/* .dark 블록 삭제 — 01번에서 라이트 테마 하나로 고정 */
```

## 모서리 파생값 (05번 방식 2 반영, 실제 코드 반영 완료)

```css
--radius:    16px;                        /* 기준값 — 버튼, 액션형 카드 */
--radius-sm: calc(var(--radius) - 10px);  /* 6px  — 태그 */
--radius-md: calc(var(--radius) - 6px);   /* 10px — 작은 칩 */
--radius-lg: calc(var(--radius) - 2px);   /* 14px — 카드, 다이얼로그 */
--radius-xl: calc(var(--radius) + 4px);   /* 20px — 큰 컨테이너, Bottom Sheet */
```

## 색 표기

**HEX + rgba 혼용으로 통일**(OKLCH 미사용) — 포인트 색이 무채색 하나뿐이라 OKLCH의 "색상각만 교체" 이점이 필요 없다.

## `--ring` 관련 추가 사항

기존 코드에는 `:focus`/`:focus-visible` 스타일이 전혀 없었다 (키보드 탐색 시 포커스 표시가 안 보이는 접근성 공백). 이번 적용에서 `--ring`을 도입하며 다음을 `style.css`에 함께 추가한다:

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

마우스 클릭 시에는 나타나지 않고(`:focus-visible`) 키보드 탭 이동 시에만 표시되므로 기존 시각 디자인에 영향이 없다.

## 체크리스트
- [x] 02~07에서 정한 값만 옮겼는가 — `--destructive`, `--input`, `--ring`만 이번에 새로 정의(02~07에 자리가 없던 shadcn 필수 토큰)
- [x] 모든 `--이름`/`--이름-foreground` 짝의 대비가 4.5:1 이상인가 — `--primary`(#14151A)/`--primary-foreground`(#FFFFFF) 15:1 이상
- [x] HEX와 OKLCH 중 하나로 통일했는가 — HEX+rgba
- [x] 안 쓰는 변수 블록을 삭제했는가 — `.dark`, `--chart-*`, `--sidebar-*` 전부 삭제
- [x] 컴포넌트 코드에서 색을 변수로만 참조하는가 — 기존 `--color-*` 참조는 그대로 유지
- [x] 실제 코드에 없는 변수를 문서에만 남겨뒀다면 그 사실을 명시했는가 — `--ring`/`--radius*` 외 나머지는 미도입 상태임을 위에 명시
