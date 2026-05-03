// CHUNAV SAATHI — explainer.js
let _explainerStep = 0;

/**
 * Renders the explainer screen
 * @returns {void}
 */
function renderExplainer() {
  _explainerStep = 0;
  renderExplainerStep();
}

/**
 * Renders the current step of the explainer
 * @returns {void}
 */
function renderExplainerStep() {
  const el = document.getElementById('screen-explainer');
  const steps = t('explainer_steps');
  const total = steps.length;
  const step = steps[_explainerStep];
  const pct = Math.round(((_explainerStep + 1) / total) * 100);

  const dots = steps.map((_, i) => `<div class="step-dot ${i < _explainerStep ? 'done' : i === _explainerStep ? 'current' : ''}"></div>`).join('');
  const isFirst = _explainerStep === 0;
  const isLast = _explainerStep === total - 1;

  el.innerHTML = `
    <div class="explainer-progress">
      <div class="explainer-step-counter">
        <span>${t('explainer_title')}</span>
        <span>${_explainerStep + 1} / ${total}</span>
      </div>
      <div class="progress-bar-wrap" role="progressbar" aria-valuenow="${_explainerStep + 1}" aria-valuemin="1" aria-valuemax="${total}" aria-label="Step ${_explainerStep + 1} of ${total}"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    </div>
    <div class="step-dots">${dots}</div>

    <div class="explainer-card">
      <div class="explainer-card-top">
        <div class="explainer-icon">${step.icon}</div>
        <div class="explainer-step-label">पायरी / Step ${step.num}</div>
        <div class="explainer-step-title">${step.title}</div>
      </div>
      <div class="explainer-card-body">
        <p class="explainer-desc">${step.desc}</p>
        <div class="explainer-tip">${step.tip}</div>
      </div>
    </div>

    <div class="explainer-actions">
      ${!isFirst ? `<button class="btn btn-ghost" onclick="explainerPrev()">${t('explainer_prev')}</button>` : '<div></div>'}
      <button class="btn ${isLast ? 'btn-primary' : 'btn-secondary'}" onclick="${isLast ? "explainerDone()" : "explainerNext()"}">
        ${isLast ? t('explainer_done') : t('explainer_next')}
      </button>
    </div>`;

  setVoiceText(`${step.title}. ${step.desc}`);
}

/**
 * Advances to the next explainer step
 * @returns {void}
 */
function explainerNext() {
  const steps = t('explainer_steps');
  if (_explainerStep < steps.length - 1) {
    _explainerStep++;
    renderExplainerStep();
    document.getElementById('screen-container').scrollTop = 0;
  }
}

/**
 * Goes back to the previous explainer step
 * @returns {void}
 */
function explainerPrev() {
  if (_explainerStep > 0) {
    _explainerStep--;
    renderExplainerStep();
    document.getElementById('screen-container').scrollTop = 0;
  }
}

/**
 * Completes the explainer and navigates to the next module
 * @returns {void}
 */
function explainerDone() {
  AppState.markComplete('explainer');
  showToast('🎉 ' + (AppState.lang === 'en' ? 'Voting process completed! Try the EVM simulator next.' : AppState.lang === 'hi' ? 'मतदान प्रक्रिया पूरी! अब EVM सराव करें।' : 'मतदान प्रक्रिया पूर्ण! आता EVM सराव करा.'));
  navigate('evm');
}
