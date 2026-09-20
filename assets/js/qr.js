/**
 * QR Bottom Sheet Module
 * 프로필 URL을 QR코드로 보여주고 이미지로 저장할 수 있는 Bottom Sheet
 * 클라이언트에서 canvas로 직접 QR을 그리므로 URL이 외부 서버로 전송되지 않는다.
 */
const QRModule = (() => {
  'use strict';

  const PROFILE_URL = 'https://gospelfix.github.io/profile/';

  // State
  const state = {
    qrGenerated: false,
    lastFocusedEl: null
  };

  // DOM Elements
  const elements = {
    triggerBtn: null,
    root: null,
    backdrop: null,
    sheet: null,
    closeBtn: null,
    canvas: null,
    saveBtn: null
  };

  /**
   * HTML 이스케이핑 (XSS 방지) — cards.js의 escapeHtml()과 동일한 매핑
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
   * Bottom Sheet 마크업 생성
   * @returns {string} HTML 문자열
   */
  const buildSheetMarkup = () => {
    const escapedUrl = escapeHtml(PROFILE_URL);

    return `
      <div class="qr-sheet-backdrop"></div>
      <div class="qr-sheet" role="dialog" aria-modal="true" aria-labelledby="qrSheetTitle">
        <div class="qr-sheet-handle"></div>
        <div class="qr-sheet-header">
          <h2 class="qr-sheet-title" id="qrSheetTitle">QR코드로 공유</h2>
          <button type="button" class="qr-sheet-close" aria-label="닫기">
            <i data-lucide="x" aria-hidden="true" focusable="false"></i>
          </button>
        </div>
        <div class="qr-sheet-body">
          <div class="qr-sheet-canvas-wrap">
            <canvas class="qr-sheet-canvas" width="200" height="200"></canvas>
          </div>
          <p class="qr-sheet-desc">카메라로 스캔하면 프로필로 연결됩니다</p>
          <p class="qr-sheet-url">${escapedUrl}</p>
        </div>
        <div class="qr-sheet-footer">
          <button type="button" class="qr-sheet-save-btn">이미지로 저장</button>
        </div>
      </div>
    `;
  };

  /**
   * Bottom Sheet DOM 생성 (app.js의 createToast()와 동일 패턴 — 없으면 만들어 body에 붙인다)
   */
  const createSheet = () => {
    let root = document.querySelector('.qr-sheet-root');

    if (!root) {
      root = document.createElement('div');
      root.className = 'qr-sheet-root';
      root.setAttribute('aria-hidden', 'true');
      root.innerHTML = buildSheetMarkup();
      document.body.appendChild(root);

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }

    elements.root = root;
    elements.backdrop = root.querySelector('.qr-sheet-backdrop');
    elements.sheet = root.querySelector('.qr-sheet');
    elements.closeBtn = root.querySelector('.qr-sheet-close');
    elements.canvas = root.querySelector('.qr-sheet-canvas');
    elements.saveBtn = root.querySelector('.qr-sheet-save-btn');
  };

  /**
   * 토스트 메시지 표시 (App 모듈의 showToast 재사용, 없으면 조용히 무시)
   * @param {string} message - 표시할 메시지
   */
  const notify = (message) => {
    if (typeof App !== 'undefined' && typeof App.showToast === 'function') {
      App.showToast(message);
    }
  };

  /**
   * 최초 open 시 1회만 QR 생성
   */
  const generateQrIfNeeded = () => {
    if (state.qrGenerated) return;

    if (typeof QRCode === 'undefined') {
      console.error('QRCode 라이브러리를 불러오지 못했습니다');
      notify('QR 코드를 생성할 수 없습니다');
      return;
    }

    QRCode.toCanvas(elements.canvas, PROFILE_URL, { width: 200, margin: 1 }, (err) => {
      if (err) {
        console.error('QR 코드 생성 실패:', err);
        notify('QR 코드를 생성할 수 없습니다');
        return;
      }
      state.qrGenerated = true;
    });
  };

  /**
   * QR 캔버스를 PNG 이미지로 저장
   */
  const handleSaveImage = () => {
    if (!elements.canvas || !state.qrGenerated) return;

    const link = document.createElement('a');
    link.href = elements.canvas.toDataURL('image/png');
    link.download = 'profile-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * 키보드 이벤트 처리 (ESC 닫기, 닫기/저장 버튼 사이만 순환하는 focus trap)
   * @param {KeyboardEvent} e
   */
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      closeSheet();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const focusable = [elements.closeBtn, elements.saveBtn];
      const currentIndex = focusable.indexOf(document.activeElement);
      const step = e.shiftKey ? -1 : 1;
      const nextIndex = (currentIndex + step + focusable.length) % focusable.length;
      focusable[nextIndex].focus();
    }
  };

  /**
   * Bottom Sheet 열기
   */
  const openSheet = () => {
    state.lastFocusedEl = document.activeElement;

    elements.root.classList.add('is-open');
    elements.root.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    generateQrIfNeeded();

    if (elements.closeBtn) {
      elements.closeBtn.focus();
    }

    document.addEventListener('keydown', handleKeydown);
  };

  /**
   * Bottom Sheet 닫기
   */
  const closeSheet = () => {
    elements.root.classList.remove('is-open');
    elements.root.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    document.removeEventListener('keydown', handleKeydown);

    if (state.lastFocusedEl && typeof state.lastFocusedEl.focus === 'function') {
      state.lastFocusedEl.focus();
    }
  };

  /**
   * Bind event listeners
   */
  const bindEvents = () => {
    elements.triggerBtn.addEventListener('click', openSheet);
    elements.closeBtn.addEventListener('click', closeSheet);
    elements.backdrop.addEventListener('click', closeSheet);
    elements.saveBtn.addEventListener('click', handleSaveImage);
  };

  /**
   * Initialize the module
   */
  const init = () => {
    elements.triggerBtn = document.querySelector('.qr-trigger-button');
    if (!elements.triggerBtn) return;

    createSheet();
    bindEvents();
  };

  // Public API
  return {
    init
  };
})();

document.addEventListener('DOMContentLoaded', QRModule.init);
