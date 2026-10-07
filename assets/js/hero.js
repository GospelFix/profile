/**
 * Hero Component
 * mode prop("classic" | "gradient")에 따라 프로필 히어로 UI를 전환 렌더링한다.
 */
const HeroModule = (() => {
  'use strict';

  const DEFAULT_MODE = 'gradient';

  const HERO_DATA = {
    name: '소윤호',
    imageUrl: './assets/images/propil_v1.avif',
    subtitle: 'GospelFix 대표 · AI Agent 자동화 솔루션',
    company: 'GospelFix',
    companyEn: 'AI AGENT AUTOMATION',
    roleLines: ['가스펄픽스(GospelFix) 대표'],
    tags: ['AI 챗봇 예약 시스템', '1:1 문의', '온라인 서비스', '홈페이지', '쇼핑몰'],
    email: 'thdbsgh3443@kakao.com',
    phone: '010-3388-2024',
    phoneHref: 'tel:010-3388-2024',
    homepageUrl: 'https://gospelfix.vercel.app/layer'
  };

  // Lucide 아이콘 이름 매핑 (렌더링은 index.html에서 로드하는 lucide.createIcons()가 담당)
  const ICONS = {
    chevronLeft: 'chevron-left',
    share: 'share-2',
    externalLink: 'external-link',
    mail: 'mail',
    phone: 'phone',
    globe: 'globe',
    clock: 'clock',
    chevronDown: 'chevron-down'
  };

  const icon = (name) => `<i data-lucide="${ICONS[name]}"></i>`;

  // 트리거 버튼만 렌더링한다. 요일별 목록 패널은 hours.js(HoursModule)가 document.body에 직접
  // 생성해 붙인다 — .hero-glow-zone의 overflow:hidden(그라데이션 배경 차단용)에 패널이
  // 잘리는 것을 피하기 위해 qr.js의 Bottom Sheet와 동일하게 body 레벨에 렌더링하는 방식을 따른다.
  const hoursBlock = () => `
    <div class="hero-hours">
      <button type="button" class="hero-hours-trigger" aria-expanded="false" aria-controls="heroHoursPanel">
        ${icon('clock')}
        <span class="hero-hours-status" data-hours-status></span>
        <span class="hero-hours-today" data-hours-today></span>
        <i data-lucide="${ICONS.chevronDown}" class="hero-hours-chevron"></i>
      </button>
    </div>
  `;

  const badgeBlock = (data) => `
    <div class="profile-hero-badge">
      <div class="profile-hero-badge-text">
        <span class="profile-hero-company">${data.company}</span>
        <span class="profile-hero-company-en">${data.companyEn}</span>
      </div>
    </div>
  `;

  const roleAndTagsBlock = (data) => `
    <p class="profile-hero-role">${data.roleLines.join('<br />')}</p>
    <div class="profile-hero-tags">
      ${data.tags.map((tag) => `<span class="hero-tag">${tag}</span>`).join('')}
    </div>
  `;

  // mode 정의부 — 사용하는 곳: index.html의 <div id="profileHero" data-mode="..."> 속성값
  //   - "classic"  : 기존 디자인 (전체 프로필 사진 + 이름·배지 한 행)
  //   - "gradient" : 그라데이션 배경 + 원형 아바타 + 액션 버튼 행 (DEFAULT_MODE)
  const TEMPLATES = {
    /** 기존 디자인: 전체 프로필 사진 + 이름·배지가 한 행에 있는 정보 카드 */
    classic: (data) => `
      <div class="profile-hero-image">
        <img src="${data.imageUrl}" alt="${data.name} 프로필" id="profileImg" />
      </div>
      <div class="profile-hero-card">
        <div class="profile-hero-top">
          <h1 class="profile-hero-name">${data.name}</h1>
          ${badgeBlock(data)}
        </div>
        ${roleAndTagsBlock(data)}
      </div>
    `,

    /** 새 디자인: 은은한 그라데이션 배경 + 원형 아바타 + 액션 버튼 행 */
    gradient: (data) => `
      <div class="hero-glow-zone">
      <video class="hero-bg-video" src="./assets/video/video.mp4" autoplay muted loop playsinline></video>
      <div class="hero-topbar">
        <button type="button" class="hero-icon-btn hero-back-btn" aria-label="뒤로가기">
          ${icon('chevronLeft')}
        </button>
        <div class="hero-topbar-right">
          <button type="button" class="hero-icon-btn hero-share-trigger" aria-label="프로필 공유하기">
            ${icon('share')}
          </button>
          <a href="${data.homepageUrl}" target="_blank" rel="noopener noreferrer" class="hero-icon-btn" aria-label="GospelFix 홈페이지 바로가기">
            ${icon('externalLink')}
          </a>
        </div>
      </div>

      <div class="hero-avatar-wrap">
        <div class="hero-avatar">
          <img src="${data.imageUrl}" alt="${data.name} 프로필" id="profileImg" />
        </div>
      </div>

      <h1 class="profile-hero-name">${data.name}</h1>
      <p class="hero-subtitle">${data.subtitle}</p>

      <div class="hero-actions">
        <a href="mailto:${data.email}" class="hero-action hero-mailto-btn">
          <span class="hero-action-icon">${icon('mail')}</span>
          <span class="hero-action-label">이메일</span>
        </a>
        <a href="${data.phoneHref}" class="hero-action">
          <span class="hero-action-icon">${icon('phone')}</span>
          <span class="hero-action-label">전화</span>
        </a>
        <button type="button" class="hero-action hero-share-trigger" aria-label="프로필 공유하기">
          <span class="hero-action-icon">${icon('share')}</span>
          <span class="hero-action-label">공유</span>
        </button>
        <a href="${data.homepageUrl}" target="_blank" rel="noopener noreferrer" class="hero-action">
          <span class="hero-action-icon">${icon('globe')}</span>
          <span class="hero-action-label">홈페이지</span>
        </a>
      </div>

      ${hoursBlock()}
      </div>

      <div class="profile-hero-card">
        <div class="profile-hero-top">
          ${badgeBlock(data)}
        </div>
        ${roleAndTagsBlock(data)}
      </div>
    `
  };

  /**
   * 뒤로가기 버튼(mode=gradient)과 이메일 발송 확인 다이얼로그를 렌더링 후 연결한다.
   */
  const bindHeroEvents = (root) => {
    const backBtn = root.querySelector('.hero-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => history.back());
    }

    const mailtoBtn = root.querySelector('.hero-mailto-btn');
    if (mailtoBtn) {
      mailtoBtn.addEventListener('click', (e) => {
        if (!confirm(`${HERO_DATA.email}으로 이메일을 보내시겠습니까?`)) {
          e.preventDefault();
        }
      });
    }
  };

  /**
   * @param {Object} [props]
   * @param {'classic'|'gradient'} [props.mode] - 렌더링할 히어로 UI 모드
   * @param {string} [props.target] - 렌더링 대상 셀렉터 (기본: #profileHero)
   */
  const init = (props = {}) => {
    const root = document.querySelector(props.target || '#profileHero');
    if (!root) return;

    const mode = props.mode || root.dataset.mode || DEFAULT_MODE;
    const render = TEMPLATES[mode] || TEMPLATES[DEFAULT_MODE];

    root.dataset.mode = mode;
    root.innerHTML = render(HERO_DATA);
    bindHeroEvents(root);
  };

  return { init };
})();
