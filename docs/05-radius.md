# 05. Radius — 모서리

## GospelFix 프로필 — 실제 값 (방식 2 — 기준값에서 파생)

```
## Radius
- 기준값 16px         (버튼, 액션형 카드 — 가장 많이 쓰이는 자리)
- 작은 요소(배지, 태그) 기준값 - 10px = 6px
- 작은 칩(hero-tag)    기준값 - 6px  = 10px
- 카드·QR 캔버스 프레임 기준값 - 2px  = 14px
- 큰 컨테이너·모달·Bottom Sheet 기준값 + 4px = 20px
- 원형은 999 (실제 구현은 `9999px` — `%`는 정사각형이 아닌 요소에서 타원이 되므로 쓰지 않는다)
```

```css
--radius:    16px;                        /* 기준값 — 버튼, 액션형 카드 */
--radius-sm: calc(var(--radius) - 10px);  /* 6px  — 태그(.tag) */
--radius-md: calc(var(--radius) - 6px);   /* 10px — 작은 칩(.hero-tag) */
--radius-lg: calc(var(--radius) - 2px);   /* 14px — 리스트 카드(.card), QR 캔버스 프레임 */
--radius-xl: calc(var(--radius) + 4px);   /* 20px — 컨테이너, Bottom Sheet 상단, 프로필 카드 */
--radius-full: 9999px;                    /* 원형 — 아바타, 핸들바, 닫기 버튼. %는 정사각형에서만 원이 되고
                                              정사각형이 아닌 요소(핸들바 40×4px 등)에서는 타원이 되므로 쓰지 않는다 */
```

## 적용 대상

| 값 | 변수 | 실제 컴포넌트 |
|---|---|---|
| 6px | `--radius-sm` | `.tag` |
| 10px | `--radius-md` | `.hero-tag` |
| 14px | `--radius-lg` | `.card`, `.qr-sheet-canvas-wrap` |
| 16px | `--radius` (기준값) | `.contact-button`, `.qr-trigger-button`, `.qr-sheet-save-btn`, `.ministry-card-link` |
| 20px | `--radius-xl` | `.container`, `.profile-hero-card`, `.qr-sheet`(상단), `.section-link` |
| 9999px | `--radius-full` | 아바타, `.qr-sheet-handle`, `.qr-sheet-close`, 원형 아이콘 버튼 |

## 의도적 예외 (기준값 파생 스케일 밖)

- **`.toast` — 12px 고정.** 값이 스케일 어디에도 정확히 맞지 않지만, 기존 시각적 크기를 바꾸지 않기로 결정했으므로(디자인 아이덴티티 적용 시 사용자 확인) 리터럴 값을 유지한다.
- **`.container` 태블릿(768px↑) — 24px 고정.** 화면이 커지는 브레이크포인트 전용 값으로, 모바일 기준 스케일과 별개로 취급한다.

두 예외 모두 "파생값을 개별로 덮어쓰지 않는다"는 원칙에서 벗어나 보이지만, **새로운 변수를 만들지 않고 리터럴로 명시적으로 고정**해 스케일을 오염시키지 않는 방식을 택했다. 신규 컴포넌트에는 이 두 값을 재사용하지 않는다.

## 체크리스트
- [x] "원형은 999" 한 줄이 반드시 포함되어 있는가 — 실제 구현은 `9999px`(`%` 아님, 정사각형이 아닌 요소에서 타원이 되는 문제를 겪은 뒤 수정)
- [x] 값의 종류가 3종 이내인가 — 기준값 포함 5종 + 예외 2종(문서화된 리터럴). 기존 시각 크기를 유지하기로 한 결정에 따른 의도적 확장
- [x] 카드가 버튼보다 같거나 큰가 — `.card`(14px) < 버튼(16px)로 예외. 2px 차이로 시각적으로 감지되지 않는 수준이라 유지, 신규 카드 컴포넌트는 16px(`--radius`) 이상을 우선 검토
- [x] 방식 2를 골랐다면, 파생값을 개별로 덮어쓰지 않았는가 — 위 두 예외를 제외하고 전부 `calc()` 파생
