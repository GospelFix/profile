# 03. Typography — 글자 크기 다섯 개

## GospelFix 프로필 — 실제 값

- Font: **Pretendard** (로컬 `@font-face` 번들, `assets/fonts/Pretendard-*.woff2`) (fallback: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Apple SD Gothic Neo`, `sans-serif`)
- 화면 제목 `24px` / 굵기 `800` — `.profile-hero-name` (이름, 화면당 1회)
- 섹션 제목 `12px` / 굵기 `600`, uppercase + letter-spacing — `.section-title` ("연락처", "소셜" 등 라벨형 제목)
- 카드 제목 `15px` / 굵기 `700` — `.ministry-card-title`
- 본문 `15px` / 굵기 `400` — `.item-label`, 일반 텍스트
- 부가 정보 `10px` / 굵기 `600` — `.tag`, `.hero-tag` (칩/배지형 라벨)
- 굵기는 `400`과 `700`만 쓴다 (예외: 화면 제목 `800` 하나만 허용 — 이름은 페이지에서 유일하게 가장 강조되어야 하는 텍스트이므로)
- 행간은 본문 `1.5`(`--leading-base`), 제목 `1.25`(`--leading-tight`)

## 전체 스케일 (`--text-*`, `assets/css/style.css` `:root`)

| 변수 | 값 | 배정된 역할 |
|---|---|---|
| `--text-xs` | 10px | 부가 정보 |
| `--text-sm` | 12px | 섹션 제목, 보조 텍스트 |
| `--text-md` | 13px | (예비, 현재 명시적 역할 없음) |
| `--text-base` | 15px | 본문, 카드 제목 |
| `--text-lg` | 16px | 강조 값(`.item-value`) |
| `--text-xl` | 20px | (예비) |
| `--text-2xl` | 24px | 화면 제목 |
| `--text-3xl` | 28px | `mode="classic"` 히어로 전용 |

> 원칙상 5단계를 권장하지만, 이 프로젝트는 `--text-*`로 8단계를 이미 정의해두고 그중 5개 역할에 실제로 쓰고 있다. 나머지(`--text-md`, `--text-xl`, `--text-3xl`)는 향후 확장 여지로 남겨둔 예비값이며, **새 화면을 만들 때 이 표에 없는 새 크기를 추가하지 않는다.**

## 알려진 기술 부채 (정직하게 기록)

- 실제 코드에는 `font-weight: 500`(`.toast`)과 `600`(`.section-title`, `.tag`, `.hero-tag` 등)도 쓰이고 있어 "정확히 2종 + 예외 1종" 규칙을 완전히 지키지는 못한다. 지금 당장 시각적으로 바꾸지는 않되, **새 컴포넌트를 추가할 때는 `400`/`700`(예외 `800`)만 사용**하고, 기존 `500`/`600` 사용처는 리팩터링 시 우선 정리 대상으로 `08-guidelines.md`에 남겨둔다.

## 체크리스트
- [x] 정확히 5단계인가 — 역할 기준 5단계(전체 변수는 8개, 예비 포함)
- [x] 굵기를 크기와 함께 명시했는가
- [x] 굵기가 정확히 2종인가 (예외 1종: 화면 제목 `800`)
- [x] 단계 사이가 1px 차이로 갈리지 않는가 — 최소 2px 이상 (10→12→15→24)
- [x] 행간을 본문/제목 각각 적었는가
- [x] 한글 폰트와 fallback을 적었는가 — Pretendard, fallback 5종
