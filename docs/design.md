<!-- 01~09를 채운 뒤 통합한 요약본. 값을 여기서 새로 만들지 않고 각 번호 파일에서 그대로 옮김. -->

# GospelFix 프로필 — Style Reference
> 소윤호 / GospelFix 대표의 개인 프로필 페이지. 절제된, 또렷한, 신뢰감 있는.

**Theme:** light (다크모드 없음)
**Platform:** mobile 390×844 (기준) / desktop 1440×900 (768px 이상 카드형)
**Icons:** Lucide (`data-lucide` + `lucide.createIcons()`)

## Colors
| 이름 | 값 | 쓰는 곳 |
|---|---|---|
| 바탕 | `#F4F5F7` (`--background`) | 화면 배경 |
| 표면 | `#FFFFFF` (`--card`) | 카드, Bottom Sheet |
| 글자 기본 | `#14151A` (`--foreground`) | 제목, 본문 |
| 글자 보조 | `rgba(20,21,26,.55)` (`--muted-foreground`) | 날짜, 부가 정보 |
| 테두리 | `rgba(20,21,26,.08)` (`--border`) | 카드 경계, 구분선 |
| 포인트 색 | `#14151A` (`--primary`, 무채색) | 주 버튼 배경 |
| 포인트 색 옅은 것 | `#EEF0F3` (`--secondary`/`--accent`) | 칩/태그 배경 |

표면이 바탕보다 밝다. 포인트 색은 채도 없는 무채색 하나뿐 — 대비로 강조를 만든다.

## Typography
- Font: Pretendard (fallback: Inter, -apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, sans-serif)
- 화면 제목 24px / 굵기 800
- 섹션 제목 12px / 굵기 600 (uppercase)
- 카드 제목 15px / 굵기 700
- 본문 15px / 굵기 400
- 부가 정보 10px / 굵기 600
- 굵기는 400과 700만 쓴다 (예외: 화면 제목 800 하나만)
- 행간은 본문 1.5, 제목 1.25

## Spacing
- 간격은 4·8·12·16·20·24만 쓴다 (32/40/48은 큰 섹션 여백 전용 확장 구간)
- 화면 좌우 여백 20px
- 카드 안쪽 여백 18~20px
- 카드와 카드 사이 16px
- 요소 안쪽 작은 간격 8px

## Radius
- 기준값(`--radius`) 16px → 이 값 하나만 바꾸면 아래 전체가 따라감
- 태그 6px (`--radius-sm`)
- 작은 칩 10px (`--radius-md`)
- 카드 14px (`--radius-lg`)
- 버튼·액션형 카드 16px (기준값 그대로)
- 큰 컨테이너·Bottom Sheet 20px (`--radius-xl`)
- 원형은 999(실제 구현 `9999px`, `%` 아님)
- 예외(리터럴 유지): `.toast` 12px, 태블릿 `.container` 24px

## Elevation
- 카드류 — 그림자 없음, 테두리 1px로만 구분
- 버튼·컨테이너 — 옅은 이중 그림자 유지 (shadcn 기본과 다른 의도적 선택)
- Bottom Sheet·Toast — 진한 그림자

## Components
- 주 버튼 — `--primary` 배경 + 흰 글자, 모서리 16px, 높이 44px 이상, 하단 고정 하나
- 보조 버튼(QR 트리거) — 흰 배경 + 테두리 1px, 주 버튼과 동일 크기
- 카드 — 흰 배경, 모서리 14px, 테두리 1px, 그림자 없음
- 입력창 — 없음
- 배지/칩 — `--secondary` 배경 + 글자 기본, 모서리 6~10px

## Guidelines

### DO
- 포인트 색은 주 버튼에만 쓴다
- 하단 고정 주 버튼은 화면당 하나
- 카드는 테두리로만 구분한다 (그림자와 섞지 않는다)
- 색은 변수로만 참조한다
- 아이콘은 Lucide 이름에서만 고른다

### DON'T
- 채도 있는 브랜드 컬러를 추가하지 않는다
- 05번 스케일 밖의 모서리 값을 새로 만들지 않는다 (원형은 `9999px` 고정, `%` 금지 — 정사각형이 아닌 요소에서 타원이 됨)
- 카드에 그림자를 쓰지 않는다
- 그라데이션은 히어로 배경 한 곳 외에는 쓰지 않는다
- 글자에 그림자를 넣지 않는다
- 다크 테마를 만들지 않는다

## 상세 근거

각 항목의 실제 코드 위치, 대비율 계산, 알려진 기술 부채(버튼-카드 모서리 2px 차이, font-weight 5종 혼용 등)는 `01-style-reference.md`~`09-shadcn-tokens.md`에 번호별로 기록되어 있다. 이 파일이 "요약", 번호 파일들이 "근거 + 예외"다.
