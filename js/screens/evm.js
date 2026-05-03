// CHUNAV SAATHI — evm.js (REALISTIC ECI EVM v3)
let _evmSelected = null;
let _evmVoted    = false;

function renderEvm() {
  _evmSelected = null;
  _evmVoted    = false;
  const lang = AppState.lang || 'mr';
  const candidates = t('evm_candidates');
  const el = document.getElementById('screen-evm');

  el.innerHTML = `
<div class="evm-wrap">

  <!-- PRACTICE BADGE -->
  <div class="evm-practice-badge">🔴 सराव मोड / PRACTICE MODE</div>

  <!-- ═══════════ CONTROL UNIT ═══════════ -->
  <div class="evm-machine evm-cu" id="evm-cu">
    <div class="evm-machine-top-strip">
      <span class="evm-led" id="evm-cu-led"></span>
      <span class="evm-unit-lbl">CONTROL UNIT</span>
    </div>

    <div class="evm-cu-body">
      <!-- LCD panel -->
      <div class="evm-lcd-panel">
        <div class="evm-lcd-screen" id="evm-lcd">
          <div class="evm-lcd-val" id="evm-lcd-val">00</div>
          <div class="evm-lcd-sub" id="evm-lcd-sub">READY</div>
        </div>
      </div>

      <!-- Blue mid panel -->
      <div class="evm-cu-blue-panel">
        <div class="evm-cu-slots">
          <div class="evm-slot"></div>
          <div class="evm-slot"></div>
          <div class="evm-slot"></div>
        </div>
        <div class="evm-ballot-officer-btn">BALLOT</div>
        <div class="evm-keyhole">🔑</div>
      </div>

      <!-- Bottom buttons -->
      <div class="evm-cu-btns">
        <div class="evm-cu-btn-disabled">RESULT</div>
        <div class="evm-cu-btn-disabled">CLOSE</div>
        <div class="evm-cu-sq-btn"></div>
      </div>
    </div>

    <div class="evm-machine-bot-strip"></div>
    <!-- Beep pulse -->
    <div class="evm-beep-dot" id="evm-beep" style="display:none"></div>
  </div>

  <!-- ═══════════ BALLOT UNIT ═══════════ -->
  <div class="evm-machine evm-bu" id="evm-bu">
    <div class="evm-machine-top-strip">
      <span class="evm-led evm-led-ready" id="evm-bu-led"></span>
      <span class="evm-unit-lbl">BALLOT UNIT</span>
    </div>

    <div class="evm-bu-header">
      <div class="evm-bu-title-mr">भारत निवडणूक आयोग</div>
      <div class="evm-bu-title-en">ELECTION COMMISSION OF INDIA</div>
    </div>

    <!-- Candidate rows -->
    <div class="evm-rows" id="evm-rows">
      ${candidates.map((c, i) => `
      <div class="evm-row" id="evm-row-${i}">
        <div class="evm-row-num">${c.num}</div>
        <div class="evm-row-info">
          <div class="evm-row-symbol">${c.symbol}</div>
          <div class="evm-row-text">
            <div class="evm-row-name">${c.name}</div>
            <div class="evm-row-party">${c.party}</div>
          </div>
        </div>
        <div class="evm-row-dot" id="evm-dot-${i}"></div>
        <button class="evm-row-btn" id="evm-btn-${i}"
          onclick="evmPress(${i})"
          aria-label="Vote for ${c.name}">
        </button>
      </div>`).join('')}
    </div>

    <div class="evm-machine-bot-strip">
      <div class="evm-bu-sq-btn"></div>
    </div>
  </div>

  <!-- ═══════════ VVPAT UNIT ═══════════ -->
  <div class="evm-machine evm-vvpat-box">
    <div class="evm-machine-top-strip">
      <span class="evm-led" id="evm-vvpat-led"></span>
      <span class="evm-unit-lbl">VVPAT</span>
    </div>
    <div class="evm-vvpat-body">
      <div class="evm-vvpat-window" id="evm-vvpat-win">
        <div class="evm-vvpat-glass">
          <div class="evm-vvpat-idle-txt" id="evm-vvpat-idle">— — —</div>
          <div class="evm-vvpat-slip" id="evm-vvpat-slip"></div>
        </div>
      </div>
      <div class="evm-vvpat-footer">${t('evm_vvpat_label')}</div>
    </div>
  </div>

  <!-- STATUS TEXT -->
  <div class="evm-status" id="evm-status">${t('evm_instruction')}</div>

  <!-- SUCCESS OVERLAY (hidden until voted) -->
  <div class="evm-overlay" id="evm-overlay" style="display:none">
    <div class="evm-overlay-box">
      <div style="font-size:52px">✅</div>
      <div class="evm-overlay-title">${t('evm_voted_title')}</div>
      <div class="evm-overlay-desc">${t('evm_voted_desc')}</div>
      <button class="btn btn-primary" onclick="evmReset()">${t('evm_reset')}</button>
    </div>
  </div>

</div>`;

  // Start LCD idle blink
  _evmStartBlink();
  setVoiceText(t('evm_instruction'));
}

// ── LCD blink (idle) ─────────────────────────────────────────
let _blinkTimer = null;
function _evmStartBlink() {
  let visible = true;
  _blinkTimer = setInterval(() => {
    const v = document.getElementById('evm-lcd-val');
    if (v && !_evmVoted && _evmSelected === null) {
      v.style.opacity = visible ? '1' : '0.2';
      visible = !visible;
    }
  }, 700);
}
function _evmStopBlink() {
  clearInterval(_blinkTimer);
  const v = document.getElementById('evm-lcd-val');
  if (v) v.style.opacity = '1';
}

// ── Press vote button ────────────────────────────────────────
function evmPress(idx) {
  if (_evmVoted) return;

  // Deselect old row
  if (_evmSelected !== null) {
    const oldRow = document.getElementById('evm-row-' + _evmSelected);
    const oldDot = document.getElementById('evm-dot-' + _evmSelected);
    if (oldRow) oldRow.classList.remove('evm-row-selected');
    if (oldDot) oldDot.classList.remove('evm-dot-green');
  }

  _evmSelected = idx;
  const candidates = t('evm_candidates');
  const cand = candidates[idx];

  // Highlight row + turn dot green
  const row = document.getElementById('evm-row-' + idx);
  const dot = document.getElementById('evm-dot-' + idx);
  if (row) row.classList.add('evm-row-selected');
  if (dot) dot.classList.add('evm-dot-green');

  // Button press animation
  const btn = document.getElementById('evm-btn-' + idx);
  if (btn) {
    btn.classList.add('evm-btn-pressed');
    setTimeout(() => btn && btn.classList.remove('evm-btn-pressed'), 150);
  }

  // Stop idle blink, update LCD
  _evmStopBlink();
  const lcdVal = document.getElementById('evm-lcd-val');
  const lcdSub = document.getElementById('evm-lcd-sub');
  if (lcdVal) lcdVal.textContent = String(idx + 1).padStart(2, '0');
  if (lcdSub) lcdSub.textContent = cand.name.split(' ')[0];

  // LED on VVPAT glows
  const vvpatLed = document.getElementById('evm-vvpat-led');
  if (vvpatLed) vvpatLed.classList.add('evm-led-ready');

  // Status text
  const status = document.getElementById('evm-status');
  if (status) status.textContent = `${cand.symbol} ${cand.name} — ${t('evm_screen_selected')}`;

  // Beep
  _evmBeep();

  // Mark voted
  _evmVoted = true;

  // Disable all buttons
  document.querySelectorAll('.evm-row-btn').forEach(b => b.disabled = true);

  // Show VVPAT slip
  _evmShowSlip(cand);
}

// ── Web Audio beep ───────────────────────────────────────────
function _evmBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {}

  const beep = document.getElementById('evm-beep');
  if (beep) {
    beep.style.display = 'block';
    setTimeout(() => { if (beep) beep.style.display = 'none'; }, 900);
  }
}

// ── VVPAT slip ───────────────────────────────────────────────
function _evmShowSlip(cand) {
  const idle = document.getElementById('evm-vvpat-idle');
  const slip = document.getElementById('evm-vvpat-slip');
  if (!idle || !slip) return;

  idle.style.display = 'none';
  slip.innerHTML = `
    <div class="evm-slip-inner">
      <div class="evm-slip-num">${cand.num}</div>
      <div class="evm-slip-sym">${cand.symbol}</div>
      <div class="evm-slip-name">${cand.name}</div>
      <div class="evm-slip-party">${cand.party}</div>
      <div class="evm-slip-seal">🔏 ECI</div>
    </div>`;
  slip.style.display = 'flex';
  slip.classList.add('slip-animate-in');

  // After 7 seconds drop slip and show result
  setTimeout(() => {
    slip.classList.remove('slip-animate-in');
    slip.classList.add('slip-animate-out');

    setTimeout(() => {
      // LCD → VOTED
      const lcdVal = document.getElementById('evm-lcd-val');
      const lcdSub = document.getElementById('evm-lcd-sub');
      if (lcdVal) { lcdVal.textContent = '✓'; lcdVal.style.color = '#00e676'; }
      if (lcdSub) { lcdSub.textContent = 'VOTED'; }

      // Show overlay after brief pause
      setTimeout(() => {
        const overlay = document.getElementById('evm-overlay');
        if (overlay) overlay.style.display = 'flex';
        if (typeof launchConfetti === 'function') launchConfetti();
        AppState.markComplete('evm');
        setVoiceText(t('evm_voted_title'));
      }, 500);
    }, 500);
  }, 7000);
}

function evmReset() { renderEvm(); }
