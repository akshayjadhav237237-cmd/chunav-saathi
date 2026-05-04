const fs = require('fs');

const evmJsContent = `// CHUNAV SAATHI — evm.js 
let _evmSelected = null;
let _evmVoted    = false;
let _blinkTimer  = null;

/**
 * Renders the EVM Simulator screen
 * @returns {void}
 */
function renderEvm() {
  _evmSelected = null;
  _evmVoted    = false;
  clearInterval(_blinkTimer);

  const lang       = AppState.lang || 'mr';
  const candidates = typeof CONTENT !== 'undefined' ? (CONTENT[lang] && CONTENT[lang].evm_candidates) || CONTENT['mr'].evm_candidates : [];
  const el         = document.getElementById('screen-evm');

  el.innerHTML = \`
<div class="evm-page-new">

  <div class="evm-practice-badge">🔴 सराव मोड / PRACTICE MODE</div>

  <!-- CONTROL UNIT -->
  <div class="evm-new-cu">
    <div class="evm-cu-led" id="html-cu-led"></div>
    <div class="evm-cu-label">CONTROL UNIT</div>
    <div class="evm-cu-lcd">
      <div class="evm-lcd-digits" id="evm-lcd-val">00</div>
      <div class="evm-lcd-sub" id="evm-lcd-sub">READY</div>
    </div>
    <div class="evm-cu-btns">
      <div class="evm-cu-btn">BALLOT</div>
      <div class="evm-cu-btn">RESULT</div>
      <div class="evm-cu-btn">CLOSE</div>
    </div>
  </div>

  <!-- BALLOT UNIT -->
  <div class="evm-new-bu">
    <div class="evm-bu-header">भारत निवडणूक आयोग | ELECTION COMMISSION OF INDIA</div>
    <div class="evm-bu-rows">
      \${candidates.map((c, i) => \`
        <div class="evm-bu-row">
          <div class="evm-bu-serial">\${c.num}</div>
          <div class="evm-bu-symbol">\${c.symbol}</div>
          <div class="evm-bu-name-wrap">
            <div class="evm-bu-name">\${c.name}</div>
            <div class="evm-bu-party">\${c.party}</div>
          </div>
          <div class="evm-bu-dot" id="html-dot-\${i}"></div>
          <button class="evm-bu-vote-btn" onclick="evmPress(\${i})" aria-label="Vote for \${c.name}">VOTE</button>
        </div>
      \`).join('')}
    </div>
  </div>

  <!-- VVPAT -->
  <div class="evm-new-vvpat">
    <div class="evm-vvpat-header">VVPAT</div>
    <div class="evm-vvpat-window">
      <div class="evm-slip-idle" id="evm-slip-idle">— — —</div>
      <div class="evm-slip-paper" id="evm-slip-paper"></div>
    </div>
    <div class="evm-vvpat-label">\${typeof t === 'function' ? t('evm_vvpat_label') : 'VVPAT Slip shows here'}</div>
  </div>

  <!-- STATUS -->
  <div class="evm-status-text" id="evm-status">\${typeof t === 'function' ? t('evm_instruction') : ''}</div>

  <!-- SUCCESS OVERLAY -->
  <div class="evm-success-overlay" id="evm-success" style="display:none">
    <div class="evm-success-box">
      <div class="evm-success-ico">✅</div>
      <div class="evm-success-title">\${typeof t === 'function' ? t('evm_voted_title') : 'Voted'}</div>
      <div class="evm-success-desc">\${typeof t === 'function' ? t('evm_voted_desc') : 'Success'}</div>
      <button class="btn btn-primary" onclick="evmReset()">\${typeof t === 'function' ? t('evm_reset') : 'Reset'}</button>
    </div>
  </div>

</div>\`;

  const cuLed = document.getElementById('html-cu-led');
  if (cuLed) { cuLed.style.backgroundColor = '#00ff00'; }

  _evmStartBlink();
  if (typeof setVoiceText === 'function') setVoiceText(typeof t === 'function' ? t('evm_instruction') : '');
}

/**
 * Starts blinking the LCD on the EVM Control Unit
 * @returns {void}
 */
function _evmStartBlink() {
  let show = true;
  _blinkTimer = setInterval(() => {
    if (_evmSelected !== null || _evmVoted) { clearInterval(_blinkTimer); return; }
    const v = document.getElementById('evm-lcd-val');
    if (v) v.style.opacity = show ? '1' : '0.15';
    show = !show;
  }, 650);
}

/**
 * Handles pressing a vote button on the EVM
 * @param {number} idx - Index of the candidate pressed
 * @returns {void}
 */
function evmPress(idx) {
  if (_evmVoted) return;
  clearInterval(_blinkTimer);

  if (_evmSelected !== null) {
    const pd = document.getElementById('html-dot-' + _evmSelected);
    if (pd) pd.style.backgroundColor = '#cc0000';
  }

  _evmSelected = idx;
  const dot = document.getElementById('html-dot-' + idx);
  if (dot) dot.style.backgroundColor = '#00cc00';

  const cuLed = document.getElementById('html-cu-led');
  if (cuLed) cuLed.style.backgroundColor = '#cc0000';

  const lcd = document.getElementById('evm-lcd-val');
  const sub = document.getElementById('evm-lcd-sub');
  if (lcd) lcd.textContent = '01';
  if (sub) sub.textContent = 'VOTING';

  const stat = document.getElementById('evm-status');
  const lang = AppState.lang || 'mr';
  if (stat) stat.textContent = lang === 'en' ? 'Recording vote...' : lang === 'hi' ? 'वोट दर्ज हो रहा है...' : 'मत नोंदवले जात आहे...';

  _evmVoted = true;

  const candidates = typeof CONTENT !== 'undefined' ? (CONTENT[lang] && CONTENT[lang].evm_candidates) || CONTENT['mr'].evm_candidates : [];
  const cand = candidates[idx];

  _evmBeep();
  _evmShowSlip(cand);
}

/**
 * Beeps using Web Audio API
 * @param {number} freq - Frequency in Hz
 * @param {number} vol - Volume
 * @param {number} dur - Duration in seconds
 * @returns {void}
 */
function _evmBeep(freq = 800, vol = 0.5, dur = 0.3) {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch(e) {}
}

/**
 * Shows the VVPAT slip
 * @param {Object} cand - Candidate object
 * @returns {void}
 */
function _evmShowSlip(cand) {
  const idle = document.getElementById('evm-slip-idle');
  const paper = document.getElementById('evm-slip-paper');
  if (idle) idle.style.display = 'none';

  if (paper) {
    paper.innerHTML = \`
      <div class="evm-slip-num">\${cand.num}</div>
      <div class="evm-slip-name">\${cand.name}</div>
      <div class="evm-slip-sym">\${cand.symbol}</div>
    \`;
    paper.classList.remove('falling');
    paper.classList.add('printing');

    setTimeout(() => {
      paper.classList.remove('printing');
      paper.classList.add('falling');

      setTimeout(() => {
        if (paper) paper.style.display = 'none';
        const ov = document.getElementById('evm-success');
        if (ov) ov.style.display='flex';
        if (typeof launchConfetti === 'function') launchConfetti();
        AppState.markComplete('evm');
        
        if (typeof gtag !== 'undefined') {
          gtag('event', 'evm_vote_cast', {
            practice: true,
            language: AppState.lang
          });
        }
        
        const l = AppState.lang || 'mr';
        if (typeof setVoiceText === 'function') setVoiceText(l === 'en' ? 'Vote cast successfully' : l === 'hi' ? 'वोट सफलतापूर्वक दिया गया' : 'मतदान यशस्वीरित्या पूर्ण झाले');
      }, 500);
    }, 7000);
  }
}

/**
 * Resets the EVM to its initial state
 * @returns {void}
 */
function evmReset() { renderEvm(); }
`;
fs.writeFileSync('js/screens/evm.js', evmJsContent);

const cssContent = `

/* ═══════════════════════════════════════════
   NEW EVM LAYOUT (FULLY FLEX-BASED, VERTICAL)
════════════════════════════════════════════ */

.evm-page-new {
  padding: 12px;
  overflow-y: auto;
  max-height: calc(100vh - 130px);
  -webkit-overflow-scrolling: touch;
}

.evm-practice-badge {
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: #d32f2f;
  margin-bottom: 12px;
}

/* CONTROL UNIT */
.evm-new-cu {
  width: 100%;
  max-width: 340px;
  background: #e8e4dc;
  border-radius: 12px;
  padding: 12px;
  margin: 0 auto 8px auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  position: relative;
}

.evm-cu-label {
  text-align: center;
  font-size: 10px;
  color: #777;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.evm-cu-lcd {
  width: 120px;
  height: 50px;
  background: #1a0000;
  border: 3px solid #8B0000;
  border-radius: 6px;
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.evm-cu-lcd .evm-lcd-digits {
  color: red;
  font-size: 24px;
  font-family: monospace;
  font-weight: bold;
  line-height: 1;
}

.evm-cu-lcd .evm-lcd-sub {
  color: red;
  font-size: 10px;
  font-family: monospace;
  opacity: 0.8;
}

.evm-cu-btns {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}

.evm-cu-btn {
  background: #D8D4CC;
  color: #777;
  font-size: 8px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 3px;
}

.evm-cu-led {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00ff00;
  box-shadow: 0 0 6px #00ff00;
  position: absolute;
  top: 12px;
  left: 16px;
}

/* BALLOT UNIT */
.evm-new-bu {
  width: 100%;
  max-width: 340px;
  background: #e8e4dc;
  border-radius: 12px;
  padding: 0;
  margin: 0 auto 8px auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  overflow: hidden;
}

.evm-bu-header {
  background: #1565C0;
  color: white;
  font-size: 11px;
  padding: 6px 12px;
  text-align: center;
}

.evm-bu-rows {
  display: flex;
  flex-direction: column;
}

.evm-bu-row {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #ccc;
  background: white;
  gap: 8px;
}

.evm-bu-row:last-child {
  border-bottom: none;
}

.evm-bu-serial {
  width: 24px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  flex-shrink: 0;
  text-align: center;
}

.evm-bu-symbol {
  font-size: 20px;
  width: 28px;
  flex-shrink: 0;
  text-align: center;
}

.evm-bu-name-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.evm-bu-name {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.evm-bu-party {
  font-size: 11px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.evm-bu-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cc0000;
  flex-shrink: 0;
  transition: background 0.3s;
}

.evm-bu-vote-btn {
  width: 56px;
  height: 36px;
  background: #1565C0;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 3px 0 #0D47A1;
  transition: transform 0.1s;
}

.evm-bu-vote-btn:active {
  transform: translateY(2px);
  box-shadow: 0 1px 0 #0D47A1;
}

/* VVPAT UNIT */
.evm-new-vvpat {
  width: 100%;
  max-width: 340px;
  background: #e8e4dc;
  border-radius: 12px;
  padding: 12px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.evm-vvpat-header {
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
  background: #1A3A8F;
  margin: -12px -12px 12px -12px;
  padding: 6px;
  border-radius: 12px 12px 0 0;
}

.evm-vvpat-window {
  width: 160px;
  height: 70px;
  background: #111;
  border-radius: 4px;
  margin: 8px auto;
  border: 2px solid #555;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.evm-vvpat-label {
  text-align: center;
  font-size: 10px;
  color: #777;
  margin-top: 8px;
}
`;

fs.appendFileSync('css/screens.css', cssContent);
console.log('Script done');
