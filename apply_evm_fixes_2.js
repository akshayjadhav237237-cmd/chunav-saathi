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
    <div class="evm-cu-bel">BEL MK-III</div>
    <div class="evm-cu-lcd">
      <div class="evm-lcd-digits" id="evm-lcd-val">00</div>
      <div class="evm-lcd-sub" id="evm-lcd-sub" style="font-size:10px;">READY</div>
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
    <div class="evm-bu-label">BALLOT UNIT</div>
  </div>

  <!-- VVPAT -->
  <div class="evm-new-vvpat">
    <div class="evm-vvpat-header">VVPAT</div>
    <div class="evm-vvpat-led" id="vvpat-led"></div>
    
    <div style="
      width:180px;
      height:80px;
      background:#111;
      border-radius:4px;
      margin:0 auto 6px auto;
      border:2px solid #666;
      overflow:hidden;
      position:relative;
    ">
      <!-- Slip starts BELOW the window (hidden) -->
      <div id="vvpat-slip" style="
        position:absolute;
        bottom:-80px;
        left:50%;
        transform:translateX(-50%);
        background:white;
        width:160px;
        height:64px;
        border-radius:2px;
        padding:6px 8px;
        box-sizing:border-box;
        text-align:center;
        transition:bottom 0.6s ease;
      ">
        <div id="vvpat-symbol" style="font-size:20px;line-height:1.2;"></div>
        <div id="vvpat-name" style="
          font-weight:bold;
          font-size:11px;
          color:#111;
          margin-top:2px;
        "></div>
        <div id="vvpat-num" style="
          font-size:10px;
          color:#555;
          margin-top:1px;
        "></div>
      </div>
    </div>
    
    <div class="evm-vvpat-label">कागदी पुरावा</div>
  </div>

  <!-- STATUS -->
  <div class="evm-status-text" id="evm-status">\${typeof t === 'function' ? t('evm_instruction') : ''}</div>
  
  <button id="evm-reset-btn" class="evm-reset-btn" onclick="evmReset()" style="display:none;">\${typeof t === 'function' ? t('evm_reset') : 'Reset'}</button>

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
  if (lcd) {
    lcd.textContent = '01';
    lcd.style.opacity = '1';
    lcd.style.color = 'red';
    lcd.style.fontSize = '24px';
  }
  if (sub) {
    sub.textContent = 'VOTING';
    sub.style.color = 'red';
    sub.style.fontSize = '10px';
  }

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
 * @param {Object} c - Candidate object
 * @returns {void}
 */
function _evmShowSlip(c) {
  // Show VVPAT slip — slide up after 500ms
  setTimeout(() => {
    const slip = document.getElementById('vvpat-slip');
    const sym = document.getElementById('vvpat-symbol');
    const name = document.getElementById('vvpat-name');
    const num = document.getElementById('vvpat-num');
    
    if (sym) sym.textContent = c.symbol;
    if (name) name.textContent = c.name;
    if (num) num.textContent = c.party;
    
    // Slide up into view
    if (slip) slip.style.bottom = '8px';
    
    // Activate VVPAT LED green
    const led = document.getElementById('vvpat-led');
    if (led) {
      led.style.background = '#00ff00';
      led.style.boxShadow = '0 0 8px #00ff00';
    }
  }, 500);

  // After 7.5 seconds slide slip back DOWN
  setTimeout(() => {
    const slip = document.getElementById('vvpat-slip');
    if (slip) slip.style.bottom = '-80px';
    
    const led = document.getElementById('vvpat-led');
    if (led) {
      led.style.background = '#555';
      led.style.boxShadow = 'none';
    }
    
    // Update LCD to VOTED
    const lcd = document.getElementById('evm-lcd-val');
    const lcdLabel = document.getElementById('evm-lcd-sub');
    if (lcd) {
      lcd.textContent = '✓';
      lcd.style.fontSize = '22px';
      lcd.style.color = '#00ff00';
    }
    if (lcdLabel) {
      lcdLabel.textContent = 'VOTED';
      lcdLabel.style.color = '#00ff00';
      lcdLabel.style.fontSize = '10px';
    }
    
    // Show success message
    const status = document.getElementById('evm-status');
    const lang = AppState.lang || 'mr';
    const successMsg = lang === 'en' ? 'Vote cast successfully!' : lang === 'hi' ? 'वोट सफलतापूर्वक दर्ज किया गया!' : 'मत यशस्वीरित्या नोंदले गेले!';
    if (status) {
      status.innerHTML = \`
        <div style="font-size:22px;">🎉</div>
        <div style="font-weight:bold;
          color:#1565C0;font-size:15px;
          margin:4px 0;">
          \${c.symbol} \${c.name}
        </div>
        <div style="font-size:12px;color:#444;">
          \${successMsg}
        </div>\`;
    }
    
    // Show reset button
    const resetBtn = document.getElementById('evm-reset-btn');
    if (resetBtn) resetBtn.style.display = 'block';
    
    if (typeof launchConfetti === 'function') launchConfetti();
    
    AppState.markComplete('evm');
    if (typeof gtag !== 'undefined') {
      gtag('event', 'evm_vote_cast', {
        practice: true,
        language: AppState.lang
      });
    }
    
    if (typeof setVoiceText === 'function') setVoiceText(successMsg);
  }, 7500);
}

/**
 * Resets the EVM to its initial state
 * @returns {void}
 */
function evmReset() { renderEvm(); }
`;
fs.writeFileSync('js/screens/evm.js', evmJsContent);

// Fix colors in css/screens.css
let css = fs.readFileSync('css/screens.css', 'utf8');

css = css.replace(/\.evm-cu-label\s*{[^}]+}/g, '.evm-cu-label { text-align: center; font-size: 10px; color: #333; letter-spacing: 1px; margin-bottom: 4px; }');

if (!css.includes('.evm-cu-bel')) {
  css += '\n.evm-cu-bel { text-align: center; font-size: 8px; color: #666; margin-bottom: 4px; font-weight: bold; }';
}

css = css.replace(/\.evm-cu-btn\s*{[^}]+}/g, '.evm-cu-btn { background: #bbb; color: #333; font-size: 8px; font-weight: bold; padding: 4px 8px; border-radius: 3px; border: 1px solid #999; }');

css = css.replace(/\.evm-bu-header\s*{[^}]+}/g, '.evm-bu-header { background: #1565C0; color: #ffffff; font-size: 11px; padding: 6px 12px; text-align: center; font-weight: 700; }');

css = css.replace(/\.evm-bu-row\s*{[^}]+}/g, '.evm-bu-row { display: flex; align-items: center; padding: 10px 12px; border-bottom: 1px solid #ccc; background: #ffffff; gap: 8px; }');

css = css.replace(/\.evm-bu-serial\s*{[^}]+}/g, '.evm-bu-serial { width: 24px; font-size: 14px; font-weight: bold; color: #111; flex-shrink: 0; text-align: center; }');

css = css.replace(/\.evm-bu-name\s*{[^}]+}/g, '.evm-bu-name { font-size: 14px; font-weight: 700; color: #111; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }');

css = css.replace(/\.evm-bu-party\s*{[^}]+}/g, '.evm-bu-party { font-size: 11px; color: #444; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }');

css = css.replace(/\.evm-vvpat-header\s*{[^}]+}/g, '.evm-vvpat-header { text-align: center; font-size: 12px; font-weight: 700; color: #ffffff; background: #1A3A8F; margin: -12px -12px 12px -12px; padding: 6px; border-radius: 12px 12px 0 0; }');

css = css.replace(/\.evm-vvpat-label\s*{[^}]+}/g, '.evm-vvpat-label { text-align: center; font-size: 10px; color: #444; margin-top: 8px; font-weight: bold; }');

if (!css.includes('.evm-bu-label')) {
  css += '\n.evm-bu-label { text-align: center; font-size: 10px; color: #333; font-weight: 700; letter-spacing: 1px; padding: 6px; background: #c8c2b5; margin-top: auto; }';
}

css = css.replace(/\.evm-bu-vote-btn\s*{[^}]+}/g, '.evm-bu-vote-btn { width: 56px; height: 36px; background: #1565C0; color: #ffffff; border: none; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; flex-shrink: 0; box-shadow: 0 3px 0 #0D47A1; transition: transform 0.1s; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }');

if (!css.includes('.evm-reset-btn')) {
  css += '\n.evm-reset-btn { background: #1565C0; color: #ffffff; font-weight: 700; font-size: 15px; border: none; border-radius: 8px; padding: 12px 24px; margin: 16px auto 0 auto; display: block; cursor: pointer; text-shadow: 0 1px 2px rgba(0,0,0,0.3); box-shadow: 0 4px 6px rgba(0,0,0,0.2); transition: background 0.3s; }\n.evm-reset-btn:active { transform: translateY(2px); box-shadow: 0 2px 4px rgba(0,0,0,0.2); }';
}

css = css.replace(/\.evm-status-text\s*{[^}]+}/g, '.evm-status-text { margin-top: 16px; text-align: center; padding: 12px; background: rgba(255, 255, 255, 0.8); border-radius: 8px; font-size: 14px; font-weight: 500; color: #222; min-height: 24px; border: 1px solid rgba(0,0,0,0.1); }');

if (!css.includes('.evm-vvpat-led')) {
  css += '\n.evm-vvpat-led { width: 6px; height: 6px; border-radius: 50%; background: #555; position: absolute; top: 18px; left: 24px; transition: background 0.3s, box-shadow 0.3s; }';
}

fs.writeFileSync('css/screens.css', css);
console.log('Update complete.');
