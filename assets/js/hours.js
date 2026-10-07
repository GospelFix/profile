/**
 * Hours Module
 * 히어로 영역의 운영시간 배지 — 실시간으로 영업 상태를 계산해 보여주고,
 * 클릭하면 요일별 전체 운영시간을 아코디언 패널로 펼친다.
 * hero.js가 렌더링한 .hero-hours-trigger에 의존하므로 hero.js 다음에 로드한다.
 * 패널은 .hero-glow-zone의 overflow:hidden에 잘리지 않도록 document.body에 직접 생성한다
 * (qr.js의 Bottom Sheet와 동일한 패턴).
 */
const HoursModule = (() => {
  'use strict';

  // day: Date.prototype.getDay() 기준(0=일 ~ 6=토). open/close가 null이면 휴무.
  const HOURS_DATA = [
    { day: 1, label: '월요일', open: '09:00', close: '22:30' },
    { day: 2, label: '화요일', open: '09:00', close: '22:30' },
    { day: 3, label: '수요일', open: '09:00', close: '22:30' },
    { day: 4, label: '목요일', open: '09:00', close: '22:30' },
    { day: 5, label: '금요일', open: null, close: null },
    { day: 6, label: '토요일', open: '09:00', close: '14:00' },
    { day: 0, label: '일요일', open: null, close: null }
  ];

  const elements = {
    trigger: null,
    panel: null,
    statusEl: null,
    todayEl: null
  };

  const formatRange = (entry) => (entry.open && entry.close ? `${entry.open} ~ ${entry.close}` : '휴무');

  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
  };

  const isOpenNow = (entry, now) => {
    if (!entry.open || !entry.close) return false;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return nowMinutes >= toMinutes(entry.open) && nowMinutes < toMinutes(entry.close);
  };

  const renderPanel = (todayDay) => {
    elements.panel.innerHTML = HOURS_DATA.map((entry) => `
      <li class="hero-hours-row${entry.day === todayDay ? ' is-today' : ''}">
        <span class="hero-hours-day">${entry.label}</span>
        <span class="hero-hours-time${entry.open ? '' : ' is-closed'}">${formatRange(entry)}</span>
      </li>
    `).join('');
  };

  const renderStatus = (now) => {
    const todayDay = now.getDay();
    const todayEntry = HOURS_DATA.find((entry) => entry.day === todayDay);
    const open = isOpenNow(todayEntry, now);

    elements.statusEl.textContent = open ? '영업중' : '영업종료';
    elements.statusEl.classList.toggle('is-open', open);
    elements.statusEl.classList.toggle('is-closed', !open);
    elements.todayEl.textContent = formatRange(todayEntry);

    renderPanel(todayDay);
  };

  /**
   * 트리거 버튼의 현재 화면상 위치를 기준으로 패널을 바로 아래 중앙에 배치한다.
   * document.body에 붙어 있어 .hero-glow-zone의 overflow:hidden 영향을 받지 않는다.
   * body 자신의 rect를 기준으로 차이값을 계산해야 한다 — body가 position:relative인 상태에서
   * 자식(.container)의 margin-top이 body와 collapse되면 body의 padding box가 뷰포트 (0,0)이
   * 아닌 곳에서 시작할 수 있는데(예: 768px 이상 폭에서 .container margin-top:40px), absolute
   * 포지셔닝의 top/left는 그 지점을 기준으로 계산되기 때문이다. scrollY를 더하는 대신 두 rect의
   * 차이를 쓰면 이 오프셋과 스크롤 모두 자동으로 상쇄된다.
   */
  const positionPanel = () => {
    const bodyRect = document.body.getBoundingClientRect();
    const rect = elements.trigger.getBoundingClientRect();
    elements.panel.style.top = `${rect.bottom - bodyRect.top + 4}px`;
    elements.panel.style.left = `${rect.left - bodyRect.left + rect.width / 2}px`;
  };

  const closePanel = () => {
    elements.trigger.setAttribute('aria-expanded', 'false');
    elements.panel.classList.remove('is-open');
    elements.panel.setAttribute('aria-hidden', 'true');
    document.removeEventListener('click', handleOutsideClick);
    window.removeEventListener('resize', positionPanel);
  };

  const openPanel = () => {
    positionPanel();
    elements.trigger.setAttribute('aria-expanded', 'true');
    elements.panel.classList.add('is-open');
    elements.panel.setAttribute('aria-hidden', 'false');
    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('resize', positionPanel);
  };

  const handleOutsideClick = (e) => {
    if (elements.trigger.contains(e.target) || elements.panel.contains(e.target)) return;
    closePanel();
  };

  const togglePanel = () => {
    const isOpen = elements.trigger.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closePanel();
    } else {
      openPanel();
    }
  };

  /**
   * 요일별 목록 패널 DOM 생성 (qr.js의 createSheet()와 동일 패턴 — body에 직접 붙인다)
   */
  const createPanel = () => {
    const panel = document.createElement('ul');
    panel.className = 'hero-hours-panel';
    panel.id = 'heroHoursPanel';
    panel.setAttribute('aria-hidden', 'true');
    document.body.appendChild(panel);
    return panel;
  };

  const init = () => {
    elements.trigger = document.querySelector('.hero-hours-trigger');
    if (!elements.trigger) return;

    elements.panel = createPanel();
    elements.statusEl = elements.trigger.querySelector('[data-hours-status]');
    elements.todayEl = elements.trigger.querySelector('[data-hours-today]');

    renderStatus(new Date());
    elements.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePanel();
    });
  };

  return { init };
})();

document.addEventListener('DOMContentLoaded', HoursModule.init);
