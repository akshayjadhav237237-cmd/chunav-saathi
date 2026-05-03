// CHUNAV SAATHI — myths.js
/**
 * Renders the Myths screen
 * @returns {void}
 */
function renderMyths() {
  const el = document.getElementById('screen-myths');
  const lang = AppState.lang || 'mr';
  const myths = MYTHS_DATA[lang];

  el.innerHTML = `
    <div class="section-header">
      <div class="section-title">${t('myths_title')}</div>
      <div class="section-subtitle">${t('myths_subtitle')}</div>
    </div>
    <div class="myths-list">
      ${myths.map((m, i) => `
        <div class="myth-card" id="myth-${i}" style="animation-delay:${i * 0.08}s">
          <div class="myth-claim-area" onclick="toggleMyth(${i})">
            <div class="myth-num">${i + 1}</div>
            <div class="myth-claim-content">
              <div class="myth-claim-label">${lang === 'en' ? 'Claim' : lang === 'hi' ? 'दावा' : 'दावा'}</div>
              <div class="myth-claim-text">"${m.claim}"</div>
            </div>
            <span class="myth-toggle">▾</span>
          </div>
          <div class="myth-answer">
            <div class="myth-verdict ${m.verdict}">${m.verdictLabel}</div>
            <div class="myth-explanation">${m.explanation}</div>
          </div>
        </div>`).join('')}
    </div>`;

  setVoiceText(t('myths_title') + '. ' + t('myths_subtitle'));
  AppState.markComplete('myths');
}

/**
 * Toggles a myth card open or closed
 * @param {number} idx - The index of the myth card
 * @returns {void}
 */
function toggleMyth(idx) {
  const card = document.getElementById('myth-' + idx);
  if (!card) return;
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.myth-card').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
}
