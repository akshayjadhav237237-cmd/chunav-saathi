// CHUNAV SAATHI — evm.js
let _evmSelected = null;
let _evmVoted = false;

function renderEvm() {
  _evmSelected = null;
  _evmVoted = false;
  const el = document.getElementById('screen-evm');
  const candidates = t('evm_candidates');

  el.innerHTML = `
    <div class="evm-intro section-header">
      <div class="section-title">${t('evm_title')}</div>
      <div class="section-subtitle">${t('evm_subtitle')}</div>
    </div>
    <div class="evm-wrapper">
      <div class="evm-machine">
        <div class="evm-header">⚡ ELECTRONIC VOTING MACHINE</div>
        <div class="evm-screen" id="evm-screen">${t('evm_screen_idle')}</div>
        <div class="evm-candidates" id="evm-candidates">
          ${candidates.map((c, i) => `
            <button class="evm-candidate-btn" id="evm-c-${i}" onclick="evmSelect(${i})" data-idx="${i}">
              <span class="evm-num">${c.num}</span>
              <span class="evm-symbol">${c.symbol}</span>
              <span class="evm-name">${c.name}<br><small style="font-weight:400;opacity:0.7">${c.party}</small></span>
            </button>`).join('')}
        </div>
        <div class="evm-button-row">
          <button class="evm-vote-btn" id="evm-vote-btn" onclick="evmVote()" disabled>${t('evm_vote_btn')}</button>
        </div>
      </div>

      <div class="vvpat-box">
        <div class="vvpat-label">${t('evm_vvpat_label')}</div>
        <div class="vvpat-slip" id="vvpat-slip">
          <span class="vvpat-slip-sym" id="vvpat-sym"></span>
          <span class="vvpat-slip-name" id="vvpat-name"></span>
          <span class="vvpat-slip-check">✓</span>
        </div>
      </div>

      <div class="evm-result" id="evm-result">
        <div class="evm-result-icon">✅</div>
        <div class="evm-result-title">${t('evm_voted_title')}</div>
        <div class="evm-result-desc">${t('evm_voted_desc')}</div>
        <div style="margin-top:var(--space-lg)">
          <button class="btn btn-secondary" onclick="evmReset()">${t('evm_reset')}</button>
        </div>
      </div>
    </div>`;

  setVoiceText(t('evm_title') + '. ' + t('evm_instruction'));
}

function evmSelect(idx) {
  if (_evmVoted) return;
  _evmSelected = idx;
  document.querySelectorAll('.evm-candidate-btn').forEach((b, i) => b.classList.toggle('pressed', i === idx));
  const screenEl = document.getElementById('evm-screen');
  if (screenEl) screenEl.textContent = t('evm_screen_selected');
  const voteBtn = document.getElementById('evm-vote-btn');
  if (voteBtn) voteBtn.disabled = false;
}

function evmVote() {
  if (_evmSelected === null || _evmVoted) return;
  _evmVoted = true;

  const candidates = t('evm_candidates');
  const chosen = candidates[_evmSelected];

  // Update EVM screen
  const screenEl = document.getElementById('evm-screen');
  if (screenEl) { screenEl.textContent = t('evm_screen_voted'); screenEl.classList.add('voted'); }

  // Disable all buttons
  document.querySelectorAll('.evm-candidate-btn, #evm-vote-btn').forEach(b => b.disabled = true);

  // Show VVPAT
  const slip = document.getElementById('vvpat-slip');
  const sym = document.getElementById('vvpat-sym');
  const name = document.getElementById('vvpat-name');
  if (sym) sym.textContent = chosen.symbol;
  if (name) name.textContent = chosen.name;
  if (slip) slip.classList.add('show');

  // Show result after 4.5s
  setTimeout(() => {
    if (slip) slip.classList.remove('show');
    const result = document.getElementById('evm-result');
    if (result) result.classList.add('show');
    AppState.markComplete('evm');
  }, 4500);
}

function evmReset() {
  renderEvm();
}
