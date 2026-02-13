/**
 * Card Loading Module
 * 포트폴리오, 교회 사역 등의 카드 데이터를 동적으로 로드하는 모듈
 */
const CardsModule = (() => {
  'use strict';

  /**
   * HTML 이스케이핑 (XSS 방지)
   * @param {string} text - 이스케이프할 텍스트
   * @returns {string} 이스케이프된 텍스트
   */
  const escapeHtml = (text) => {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, (char) => map[char]);
  };

  /**
   * 데이터 검증 (필수 필드 확인)
   * @param {Object} card - 카드 데이터 객체
   * @returns {Object} { isValid: boolean, error: string|null }
   */
  const validateCard = (card) => {
    if (!card || typeof card !== 'object') {
      return { isValid: false, error: '카드 데이터가 유효하지 않습니다' };
    }

    const requiredFields = ['title', 'subtitle', 'info', 'link', 'tags'];
    const missingFields = requiredFields.filter((field) => !card[field]);

    if (missingFields.length > 0) {
      return {
        isValid: false,
        error: `필수 필드 누락: ${missingFields.join(', ')}`
      };
    }

    if (!Array.isArray(card.tags)) {
      return { isValid: false, error: '태그는 배열이어야 합니다' };
    }

    return { isValid: true, error: null };
  };

  /**
   * 데이터 정규화 (기본값 설정)
   * @param {Object} card - 카드 데이터 객체
   * @returns {Object} 정규화된 카드 데이터
   */
  const normalizeCard = (card) => {
    return {
      ...card,
      title: card.title || '',
      subtitle: card.subtitle || '',
      info: card.info || '',
      link: card.link || '#',
      tags: Array.isArray(card.tags) ? card.tags : [],
      date: card.date || null,
      titleSuffix: card.titleSuffix || null,
      imageType: card.imageType || null,
      imageUrl: card.imageUrl || null,
      icon: card.icon || null
    };
  };

  /**
   * SVG 경로를 렌더링 HTML로 변환
   * @param {Object} icon - 아이콘 데이터 객체
   * @returns {string} HTML 문자열
   */
  const renderIconPaths = (icon) => {
    let pathsHtml = '';

    if (icon.paths) {
      pathsHtml += icon.paths
        .map((d) => `<path d="${d}" />`)
        .join('');
    }

    if (icon.circles) {
      pathsHtml += icon.circles
        .map((c) => `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" />`)
        .join('');
    }

    return pathsHtml;
  };

  /**
   * 카드 이미지 HTML 생성
   * @param {Object} card - 카드 데이터 객체
   * @returns {string} HTML 문자열
   */
  const renderCardImage = (card) => {
    if (card.imageType === 'image' && card.imageUrl) {
      const escapedUrl = escapeHtml(card.imageUrl);
      const escapedTitle = escapeHtml(card.title || '');

      return `
        <div class="ministry-card-image has-image">
          <img src="${escapedUrl}" alt="${escapedTitle}" />
        </div>
      `;
    }

    if (card.icon && card.icon.viewBox) {
      const pathsHtml = renderIconPaths(card.icon);
      const escapedViewBox = escapeHtml(card.icon.viewBox);

      return `
        <div class="ministry-card-image">
          <svg viewBox="${escapedViewBox}" fill="none" stroke="currentColor" stroke-width="1.5">
            ${pathsHtml}
          </svg>
        </div>
      `;
    }

    return '';
  };

  /**
   * 태그 HTML 생성
   * @param {Array} tags - 태그 배열
   * @returns {string} HTML 문자열
   */
  const renderTags = (tags) => {
    if (!Array.isArray(tags) || tags.length === 0) {
      return '';
    }

    return tags
      .map(
        (tag, i) =>
          `<span class="tag ${i === 0 ? 'tag-primary' : 'tag-outline'}">${escapeHtml(tag)}</span>`
      )
      .join('');
  };

  /**
   * 제목 HTML 생성
   * @param {Object} card - 카드 데이터 객체
   * @returns {string} HTML 문자열
   */
  const renderTitle = (card) => {
    const escapedTitle = escapeHtml(card.title || '');
    const titleContent = `<span class="highlight">${escapedTitle}</span>`;

    return card.titleSuffix ? `${titleContent}${escapeHtml(card.titleSuffix)}` : titleContent;
  };

  /**
   * 날짜 HTML 생성
   * @param {Object} card - 카드 데이터 객체
   * @returns {string} HTML 문자열
   */
  const renderDate = (card) => {
    return card.date
      ? `<p class="ministry-card-date">${escapeHtml(card.date)}</p>`
      : '';
  };

  /**
   * 단일 카드 HTML 생성
   * @param {Object} card - 카드 데이터 객체
   * @returns {string} HTML 문자열
   */
  const renderCardHTML = (card) => {
    // 데이터 정규화
    const normalizedCard = normalizeCard(card);

    // 데이터 검증
    const validation = validateCard(normalizedCard);
    if (!validation.isValid) {
      console.warn(`카드 데이터 검증 실패: ${validation.error}`, card);
      return ''; // 유효하지 않은 데이터는 렌더링하지 않음
    }

    const imageHtml = renderCardImage(normalizedCard);
    const tagsHtml = renderTags(normalizedCard.tags);
    const titleHtml = renderTitle(normalizedCard);
    const dateHtml = renderDate(normalizedCard);

    const isExternal = normalizedCard.link.startsWith('http');
    const targetAttr = isExternal ? 'target="_blank"' : '';
    const escapedLink = escapeHtml(normalizedCard.link);
    const escapedSubtitle = escapeHtml(normalizedCard.subtitle);
    const escapedInfo = escapeHtml(normalizedCard.info);

    return `
      <a href="${escapedLink}" class="ministry-card-link" ${targetAttr}>
        ${imageHtml}
        <div class="ministry-card-content">
          <p class="ministry-card-subtitle">${escapedSubtitle}</p>
          <h3 class="ministry-card-title">${titleHtml}</h3>
          ${dateHtml}
          <p class="ministry-card-info">${escapedInfo}</p>
          <div class="ministry-card-tags">${tagsHtml}</div>
        </div>
      </a>
    `;
  };

  /**
   * Swiper 인스턴스 초기화
   * @param {string} swiperSelector - Swiper 요소 선택자
   */
  const initSwiper = (swiperSelector) => {
    new Swiper(swiperSelector, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      centeredSlides: false,
      pagination: {
        el: `${swiperSelector} .swiper-pagination`,
        clickable: true
      }
    });
  };

  /**
   * 토스트 메시지 표시 (App 모듈의 showToast 활용)
   * @param {string} message - 표시할 메시지
   */
  const showErrorToast = (message) => {
    // App 모듈에서 제공되는 toast 기능 활용
    // HTML에 생성된 toast 요소 직접 사용
    const toast = document.querySelector('.toast');
    if (toast) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }
  };

  /**
   * 카드 데이터 로드 및 렌더링 (통합 함수)
   * @param {Object} config - 설정 객체
   *   - dataUrl: JSON 파일 경로 (예: './data/ministry-cards.json')
   *   - containerId: 카드를 추가할 컨테이너 ID
   *   - swiperSelector: Swiper 인스턴스의 선택자
   *   - errorMessage: 에러 발생 시 표시할 메시지 (선택)
   */
  const loadCards = async (config) => {
    const { dataUrl, containerId, swiperSelector, errorMessage = '카드를 불러올 수 없습니다' } = config;

    try {
      // 데이터 로드
      const response = await fetch(dataUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cards = await response.json();
      const container = document.getElementById(containerId);

      if (!container) {
        throw new Error(`Container with ID "${containerId}" not found`);
      }

      // 컨테이너 초기화
      container.innerHTML = '';

      // 카드 렌더링
      cards.forEach((card) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = renderCardHTML(card);
        container.appendChild(slide);
      });

      // Swiper 초기화
      initSwiper(swiperSelector);
    } catch (error) {
      console.error(`Failed to load cards from ${dataUrl}:`, error);
      showErrorToast(errorMessage);
    }
  };

  // Public API
  return {
    loadCards
  };
})();
