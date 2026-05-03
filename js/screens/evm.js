// CHUNAV SAATHI — evm.js (SVG-based realistic ECI EVM — reference image accurate)
let _evmSelected = null;
let _evmVoted    = false;
let _blinkTimer  = null;

function renderEvm() {
  _evmSelected = null;
  _evmVoted    = false;
  clearInterval(_blinkTimer);

  // Allow BU SVG to be fully visible (main.css clips overflow-x)
  const sc = document.querySelector('.screen-container');
  if (sc) sc.style.overflowX = 'visible';

  const lang       = AppState.lang || 'mr';
  const candidates = t('evm_candidates');
  const el         = document.getElementById('screen-evm');

  // Row height & button layout constants (match SVG coordinates)
  const ROW_H      = 38;
  const BU_TOP     = 58;   // first row top offset inside BU
  const BTN_W      = 40;
  const BTN_H      = 22;

  el.innerHTML = `
<div class="evm-page">

  <!-- ═══ PRACTICE BADGE ═══ -->
  <div class="evm-practice-badge">🔴 सराव मोड / PRACTICE MODE</div>

  <!-- ═══════════════════════════════════════════
       SIDE-BY-SIDE ROW: Control Unit + Ballot Unit
  ════════════════════════════════════════════ -->
  <div class="evm-row-wrap">

    <!-- ── CONTROL UNIT ── -->
    <div class="evm-cu-wrap" id="evm-cu-wrap">
      <svg class="evm-cu-svg" viewBox="0 0 140 210" xmlns="http://www.w3.org/2000/svg">
        <!-- Body -->
        <rect x="4" y="4" width="132" height="170" rx="10" ry="10"
          fill="#F0EDE8" stroke="#C8C4BC" stroke-width="1.5"/>
        <!-- Blue front panel -->
        <rect x="14" y="18" width="112" height="128" rx="6"
          fill="#1A3A8F"/>
        <!-- Red LED display -->
        <rect x="22" y="26" width="96" height="40" rx="4"
          fill="#8B0000"/>
        <rect x="26" y="30" width="88" height="32" rx="3"
          fill="#0a0000"/>
        <!-- Green LEDs (top of blue panel) -->
        <circle cx="22" cy="15" r="4" fill="#00c853" id="svg-cu-led"/>
        <circle cx="34" cy="15" r="4" fill="#555"/>
        <!-- Key lock hole -->
        <circle cx="70" cy="110" r="6" fill="#111"/>
        <rect x="67" y="110" width="6" height="8" rx="2" fill="#111"/>
        <!-- Horizontal slots -->
        <rect x="30" y="78" width="80" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>
        <rect x="30" y="86" width="80" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>
        <rect x="30" y="94" width="80" height="4" rx="2" fill="rgba(255,255,255,0.12)"/>
        <!-- BALLOT officer button -->
        <rect x="38" y="125" width="64" height="16" rx="4" fill="#D8D4CC"/>
        <text x="70" y="136" text-anchor="middle" font-size="7"
          font-family="monospace" fill="#444" font-weight="bold">BALLOT</text>
        <!-- Bottom buttons row -->
        <rect x="18" y="148" width="44" height="14" rx="3" fill="#D8D4CC" opacity="0.6"/>
        <text x="40" y="158" text-anchor="middle" font-size="6"
          fill="#777" font-family="sans-serif" font-weight="bold">RESULT</text>
        <rect x="68" y="148" width="44" height="14" rx="3" fill="#D8D4CC" opacity="0.6"/>
        <text x="90" y="158" text-anchor="middle" font-size="6"
          fill="#777" font-family="sans-serif" font-weight="bold">CLOSE</text>
        <!-- Small blue square button -->
        <rect x="118" y="148" width="14" height="14" rx="3"
          fill="#2855C8" stroke="#1A3A8F" stroke-width="1"/>
        <!-- Bottom blue accent strip -->
        <rect x="4" y="170" width="132" height="10" rx="0"
          fill="#1A3A8F"/>
        <rect x="4" y="178" width="132" height="6" rx="0"
          fill="rgba(0,0,0,0.15)"/>
        <!-- Fold-out legs -->
        <polygon points="20,180 12,210 28,210" fill="#D8D4CC"/>
        <polygon points="120,180 112,210 128,210" fill="#D8D4CC"/>
        <!-- "CONTROL UNIT" label -->
        <text x="70" y="197" text-anchor="middle" font-size="6"
          fill="#9AA" font-family="sans-serif" letter-spacing="1">CONTROL UNIT</text>
        <!-- Cable exit on right side -->
        <circle cx="136" cy="90" r="5" fill="#888"/>
        <rect x="133" y="88" width="7" height="4" fill="#666"/>
      </svg>

      <!-- LCD overlay (HTML for blinking) -->
      <div class="evm-lcd-overlay" id="evm-lcd-wrap">
        <div class="evm-lcd-digits" id="evm-lcd-val">00</div>
        <div class="evm-lcd-sub" id="evm-lcd-sub">READY</div>
      </div>

      <!-- Beep indicator -->
      <div class="evm-beep-dot" id="evm-beep" style="display:none"></div>
    </div>

    <!-- ── CABLE SVG ── -->
    <svg class="evm-cable-svg" viewBox="0 0 30 210" xmlns="http://www.w3.org/2000/svg">
      <path d="M 2 90 C 10 90, 20 100, 28 100" 
        stroke="#666" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>

    <!-- ── BALLOT UNIT ── -->
    <div class="evm-bu-wrap" id="evm-bu-wrap">
      <svg class="evm-bu-svg" viewBox="0 0 240 210" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="236" height="170" rx="8" ry="8"
          fill="#F0EDE8" stroke="#C8C4BC" stroke-width="1.5"/>
        <!-- ECI header strip (blue) -->
        <rect x="2" y="4" width="236" height="28" rx="8" ry="8" fill="#1A3A8F"/>
        <rect x="2" y="22" width="236" height="10" fill="#1A3A8F"/>
        <text x="120" y="20" text-anchor="middle" font-size="7.5"
          fill="#fff" font-family="sans-serif" font-weight="bold"
          letter-spacing=".5">भारत निवडणूक आयोग  |  ELECTION COMMISSION OF INDIA</text>
        <!-- Candidate row dividers (4 candidates) -->
        ${candidates.map((c, i) => `
          <line x1="2" y1="${BU_TOP + i*ROW_H}" x2="238" y2="${BU_TOP + i*ROW_H}"
            stroke="#BFBBBB" stroke-width="1"/>
          <!-- Serial num box -->
          <rect x="4" y="${BU_TOP + i*ROW_H + 1}" width="22" height="${ROW_H - 1}"
            fill="${i % 2 === 0 ? '#F0EDE8' : '#EAE7E0'}"/>
          <text x="15" y="${BU_TOP + i*ROW_H + ROW_H/2 + 4}" text-anchor="middle"
            font-size="9" font-family="sans-serif" font-weight="bold" fill="#222">${c.num}</text>
          <!-- Indicator (red dot, becomes green) -->
          <circle cx="163" cy="${BU_TOP + i*ROW_H + ROW_H/2}" r="5"
            fill="#CC0000" id="svg-dot-${i}" class="svg-dot"/>
          <!-- Blue button rect outline (actual button is HTML) -->
          <rect x="171" y="${BU_TOP + i*ROW_H + 7}" width="42" height="${BTN_H}" rx="3"
            fill="#1565C0" stroke="#0D47A1" stroke-width="1"
            class="svg-vote-btn-bg" id="svg-btn-bg-${i}"/>
          <text x="192" y="${BU_TOP + i*ROW_H + 7 + BTN_H/2 + 3}"
            text-anchor="middle" font-size="7" fill="#fff"
            font-family="sans-serif" font-weight="900">VOTE</text>
        `).join('')}
        <!-- Last row border -->
        <line x1="2" y1="${BU_TOP + candidates.length*ROW_H}" x2="238"
          y2="${BU_TOP + candidates.length*ROW_H}" stroke="#BFBBBB" stroke-width="1"/>
        <!-- Blue bottom strip -->
        <rect x="2" y="170" width="236" height="10" fill="#1A3A8F"/>
        <rect x="2" y="178" width="236" height="6" fill="rgba(0,0,0,0.15)"/>
        <!-- Small square button bottom right -->
        <rect x="214" y="148" width="18" height="18" rx="3" fill="#2855C8"/>
        <!-- Fold-out legs -->
        <polygon points="25,180 16,210 34,210" fill="#D8D4CC"/>
        <polygon points="215,180 206,210 224,210" fill="#D8D4CC"/>
        <!-- BALLOT UNIT label -->
        <text x="120" y="197" text-anchor="middle" font-size="6"
          fill="#9AA" font-family="sans-serif" letter-spacing="1">BALLOT UNIT</text>
        <!-- Green LED -->
        <circle cx="10" cy="15" r="4" fill="#00c853" id="svg-bu-led"/>
        <!-- Cable entry on left -->
        <circle cx="2" cy="100" r="5" fill="#888"/>
      </svg>

      <!-- Candidate name labels (HTML overlay for Devanagari) -->
      <div class="evm-names-overlay">
        ${candidates.map((c, i) => `
          <div class="evm-name-row" style="top:${((BU_TOP + i*ROW_H + 1)/210*100).toFixed(3)}%; height:${((ROW_H - 2)/210*100).toFixed(3)}%">
            <span class="evm-name-sym">${c.symbol}</span>
            <span class="evm-name-text">
              <span class="evm-name-main">${c.name}</span>
              <span class="evm-name-party">${c.party}</span>
            </span>
          </div>`).join('')}
      </div>

      <!-- Interactive VOTE buttons (HTML, positioned over SVG) -->
      <div class="evm-btns-overlay">
        ${candidates.map((c, i) => `
          <button class="evm-vote-btn" id="evm-btn-${i}"
            style="top:${((BU_TOP + i*ROW_H + 7)/210*100).toFixed(3)}%"
            onclick="evmPress(${i})"
            aria-label="Vote for ${c.name}">
          </button>`).join('')}
      </div>
    </div>
  </div>

  <!-- ═══ VVPAT UNIT ═══ -->
  <div class="evm-vvpat-wrap">
    <svg class="evm-vvpat-svg" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="196" height="70" rx="8" fill="#F0EDE8"
        stroke="#C8C4BC" stroke-width="1.5"/>
      <rect x="2" y="2" width="196" height="14" rx="8" fill="#1A3A8F"/>
      <rect x="2" y="10" width="196" height="6" fill="#1A3A8F"/>
      <text x="100" y="12" text-anchor="middle" font-size="6.5" fill="#fff"
        font-family="sans-serif" font-weight="bold" letter-spacing="1">VVPAT</text>
      <circle cx="10" cy="8" r="3" fill="#444" id="svg-vvpat-led"/>
      <!-- Glass window -->
      <rect x="60" y="22" width="80" height="40" rx="4" fill="#0a0a0a" stroke="#444" stroke-width="1.5"/>
      <rect x="62" y="24" width="76" height="36" rx="3" fill="#050505"/>
      <!-- Footer label -->
      <text x="100" y="72" text-anchor="middle" font-size="5.5" fill="#888"
        font-family="sans-serif" letter-spacing=".5">${t('evm_vvpat_label')}</text>
    </svg>
    <!-- Slip window (HTML overlay) -->
    <div class="evm-slip-window" id="evm-slip-win">
      <div class="evm-slip-idle" id="evm-slip-idle">— — —</div>
      <div class="evm-slip-paper" id="evm-slip-paper"></div>
    </div>
  </div>

  <!-- ═══ STATUS ═══ -->
  <div class="evm-status-text" id="evm-status">${t('evm_instruction')}</div>

  <!-- ═══ SUCCESS OVERLAY ═══ -->
  <div class="evm-success-overlay" id="evm-success" style="display:none">
    <div class="evm-success-box">
      <div class="evm-success-ico">✅</div>
      <div class="evm-success-title">${t('evm_voted_title')}</div>
      <div class="evm-success-desc">${t('evm_voted_desc')}</div>
      <button class="btn btn-primary" onclick="evmReset()">${t('evm_reset')}</button>
    </div>
  </div>

</div>`;

  // Apply LED ready state on CU + BU
  const cuLed = document.getElementById('svg-cu-led');
  const buLed = document.getElementById('svg-bu-led');
  if (cuLed) { cuLed.setAttribute('fill','#00c853'); }
  if (buLed) { buLed.setAttribute('fill','#00c853'); }

  _evmStartBlink();
  setVoiceText(t('evm_instruction'));
}

/* ── LCD blink ──────────────────────────────────────────── */
function _evmStartBlink() {
  let show = true;
  _blinkTimer = setInterval(() => {
    if (_evmSelected !== null || _evmVoted) { clearInterval(_blinkTimer); return; }
    const v = document.getElementById('evm-lcd-val');
    if (v) v.style.opacity = show ? '1' : '0.15';
    show = !show;
  }, 650);
}

/* ── Vote button press ──────────────────────────────────── */
function evmPress(idx) {
  if (_evmVoted) return;
  clearInterval(_blinkTimer);

  // Reset previous selection
  if (_evmSelected !== null) {
    const pd = document.getElementById('svg-dot-' + _evmSelected);
    const pr = document.querySelector(`#evm-bu-wrap .evm-name-row:nth-child(${_evmSelected+1})`);
    if (pd) pd.setAttribute('fill','#CC0000');
    if (pr) pr.classList.remove('evm-row-active');
  }
  _evmSelected = idx;

  const candidates = t('evm_candidates');
  const cand       = candidates[idx];

  // Green dot
  const dot = document.getElementById('svg-dot-' + idx);
  if (dot) { dot.setAttribute('fill','#00c853'); dot.setAttribute('filter','url(#glow)'); }

  // Row highlight
  const rows = document.querySelectorAll('#evm-bu-wrap .evm-name-row');
  rows.forEach((r, i) => r.classList.toggle('evm-row-active', i === idx));

  // Button press visual
  const btn = document.getElementById('evm-btn-' + idx);
  if (btn) { btn.classList.add('evm-btn-down'); setTimeout(() => btn && btn.classList.remove('evm-btn-down'), 150); }

  // LCD update
  const lcdVal = document.getElementById('evm-lcd-val');
  const lcdSub = document.getElementById('evm-lcd-sub');
  if (lcdVal) { lcdVal.style.opacity='1'; lcdVal.textContent = String(idx+1).padStart(2,'0'); }
  if (lcdSub) lcdSub.textContent = cand.name.split(' ')[0];

  // Status
  const status = document.getElementById('evm-status');
  if (status) status.textContent = `${cand.symbol} ${cand.name} — ${t('evm_screen_selected')}`;

  // Disable all buttons
  _evmVoted = true;
  document.querySelectorAll('.evm-vote-btn').forEach(b => b.disabled = true);

  // VVPAT LED on
  const vLed = document.getElementById('svg-vvpat-led');
  if (vLed) { vLed.setAttribute('fill','#00c853'); }

  // Beep
  _evmBeep();

  // VVPAT slip
  _evmShowSlip(cand);
}

/* ── Web Audio beep ─────────────────────────────────────── */
function _evmBeep() {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.35);
  } catch(e) {}
  const bd = document.getElementById('evm-beep');
  if (bd) { bd.style.display='block'; setTimeout(()=>{ if(bd) bd.style.display='none'; }, 900); }
}

/* ── VVPAT slip ─────────────────────────────────────────── */
function _evmShowSlip(cand) {
  const idle  = document.getElementById('evm-slip-idle');
  const paper = document.getElementById('evm-slip-paper');
  if (!idle || !paper) return;

  idle.style.display = 'none';
  paper.innerHTML = `
    <div class="slip-serial">${cand.num}</div>
    <div class="slip-sym">${cand.symbol}</div>
    <div class="slip-name">${cand.name}</div>
    <div class="slip-party">${cand.party}</div>
    <div class="slip-seal">🔏 ECI</div>`;
  paper.style.display = 'flex';
  paper.classList.remove('slip-out');
  paper.classList.add('slip-in');

  setTimeout(() => {
    paper.classList.remove('slip-in');
    paper.classList.add('slip-out');
    setTimeout(() => {
      // LCD → VOTED
      const v = document.getElementById('evm-lcd-val');
      const s = document.getElementById('evm-lcd-sub');
      if (v) { v.textContent='✓'; v.style.color='#00e676'; v.style.textShadow='0 0 10px #00e676'; }
      if (s) { s.textContent='VOTED'; }
      // Success overlay
      setTimeout(() => {
        const ov = document.getElementById('evm-success');
        if (ov) ov.style.display='flex';
        if (typeof launchConfetti === 'function') launchConfetti();
        AppState.markComplete('evm');
        setVoiceText(t('evm_voted_title'));
      }, 500);
    }, 500);
  }, 7000);
}

function evmReset() { renderEvm(); }
