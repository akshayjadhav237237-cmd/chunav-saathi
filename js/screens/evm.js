// CHUNAV SAATHI — evm.js (REALISTIC REDESIGN)
let _evmSelected = null;
let _evmVoted = false;

function renderEvm() {
  _evmSelected = null;
  _evmVoted = false;
  const lang = AppState.lang || 'mr';
  const candidates = t('evm_candidates');
  const el = document.getElementById('screen-evm');

  el.innerHTML = `
    <div class="evm-wrapper">

      <!-- PRACTICE MODE BADGE -->
      <div class="evm-practice-badge">🔴 सराव मोड / PRACTICE MODE</div>

      <!-- BALLOT UNIT -->
      <div class="evm-unit evm-ballot-unit">
        <div class="evm-unit-label">BALLOT UNIT</div>
        <div class="evm-ballot-header">
          <div class="evm-ballot-title">भारत निवडणूक आयोग</div>
          <div class="evm-ballot-subtitle">ELECTION COMMISSION OF INDIA</div>
        </div>
        <div class="evm-candidates-list">
          ${candidates.map((c, i) => `
            <div class="evm-row" id="evm-row-${i}">
              <div class="evm-serial">${c.num}</div>
              <div class="evm-candidate-info">
                <div class="evm-candidate-symbol">${c.symbol}</div>
                <div class="evm-candidate-name">${c.name}</div>
                <div class="evm-party-name">${c.party}</div>
              </div>
              <div class="evm-indicator" id="evm-light-${i}"></div>
              <button class="evm-vote-button" id="evm-btn-${i}"
                onclick="evmPress(${i})" aria-label="Vote for ${c.name}">
                VOTE
              </button>
            </div>`).join('')}
        </div>
      </div>

      <!-- CONTROL UNIT -->
      <div class="evm-unit evm-control-unit">
        <div class="evm-unit-label">CONTROL UNIT</div>
        <div class="evm-lcd" id="evm-lcd">
          <div class="evm-lcd-line1" id="evm-lcd-l1">मशीन तयार आहे</div>
          <div class="evm-lcd-line2" id="evm-lcd-l2">READY</div>
        </div>
        <div class="evm-cu-buttons">
          <div class="evm-cu-btn disabled">
            <div class="evm-cu-btn-label">RESULT</div>
            <div class="evm-cu-btn-note">Disabled</div>
          </div>
          <div class="evm-cu-btn disabled">
            <div class="evm-cu-btn-label">CLOSE</div>
            <div class="evm-cu-btn-note">Disabled</div>
          </div>
        </div>
        <div class="evm-beep-indicator" id="evm-beep" style="display:none"></div>
      </div>

      <!-- VVPAT UNIT -->
      <div class="evm-unit evm-vvpat-unit">
        <div class="evm-unit-label">VVPAT</div>
        <div class="evm-vvpat-window" id="evm-vvpat-window">
          <div class="evm-vvpat-glass">
            <div class="evm-vvpat-idle" id="evm-vvpat-idle">— — —</div>
            <div class="evm-vvpat-slip" id="evm-vvpat-slip" style="display:none"></div>
          </div>
        </div>
        <div class="evm-vvpat-label">${t('evm_vvpat_label')}</div>
      </div>

      <!-- SUCCESS OVERLAY -->
      <div class="evm-success-overlay" id="evm-success" style="display:none">
        <div class="evm-success-box">
          <div class="evm-success-icon">✅</div>
          <div class="evm-success-title">${t('evm_voted_title')}</div>
          <div class="evm-success-desc">${t('evm_voted_desc')}</div>
          <button class="btn btn-primary" onclick="evmReset()">${t('evm_reset')}</button>
        </div>
      </div>

    </div>`;

  setVoiceText(t('evm_instruction'));
}

function evmPress(idx) {
  if (_evmVoted) return;

  const candidates = t('evm_candidates');
  const cand = candidates[idx];

  // Deselect previous
  if (_evmSelected !== null) {
    document.getElementById('evm-light-' + _evmSelected).classList.remove('active');
    document.getElementById('evm-row-' + _evmSelected).classList.remove('selected');
  }

  _evmSelected = idx;
  document.getElementById('evm-light-' + idx).classList.add('active');
  document.getElementById('evm-row-' + idx).classList.add('selected');

  // Update LCD
  document.getElementById('evm-lcd-l1').textContent = `उमेदवार क्र. ${cand.num}`;
  document.getElementById('evm-lcd-l2').textContent = cand.name;

  // Play beep
  _evmBeep();

  // Show VVPAT slip
  _evmVoted = true;
  _evmShowVVPAT(cand);

  // Disable all buttons
  document.querySelectorAll('.evm-vote-button').forEach(b => b.disabled = true);

  setVoiceText(`${cand.name} निवडले`);
}

function _evmBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch(e) {}

  // Visual beep pulse
  const beep = document.getElementById('evm-beep');
  if (beep) {
    beep.style.display = 'block';
    setTimeout(() => { if (beep) beep.style.display = 'none'; }, 800);
  }
}

function _evmShowVVPAT(cand) {
  const idle = document.getElementById('evm-vvpat-idle');
  const slip = document.getElementById('evm-vvpat-slip');
  if (!idle || !slip) return;

  idle.style.display = 'none';
  slip.style.display = 'flex';
  slip.innerHTML = `
    <div class="vvpat-slip-content">
      <div class="vvpat-serial">${cand.num}</div>
      <div class="vvpat-symbol">${cand.symbol}</div>
      <div class="vvpat-name">${cand.name}</div>
      <div class="vvpat-party">${cand.party}</div>
      <div class="vvpat-eciseal">🔏 ECI</div>
    </div>`;
  slip.classList.add('slip-in');

  // After 7s slip drops and show voted state
  setTimeout(() => {
    slip.classList.remove('slip-in');
    slip.classList.add('slip-out');
    setTimeout(() => {
      // LCD shows VOTED
      const l1 = document.getElementById('evm-lcd-l1');
      const l2 = document.getElementById('evm-lcd-l2');
      if (l1) l1.textContent = 'मत नोंदले गेले';
      if (l2) { l2.textContent = 'VOTED ✓'; l2.style.color = '#00ff88'; }
      // Show success overlay
      setTimeout(() => {
        const overlay = document.getElementById('evm-success');
        if (overlay) {
          overlay.style.display = 'flex';
          launchConfetti && launchConfetti();
        }
        AppState.markComplete('evm');
        setVoiceText(t('evm_voted_title'));
      }, 600);
    }, 600);
  }, 7000);
}

function evmReset() {
  renderEvm();
}
