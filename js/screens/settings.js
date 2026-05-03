// CHUNAV SAATHI — settings.js

/**
 * Renders the settings screen
 * @returns {void}
 */
function renderSettings() {
  const el = document.getElementById('screen-settings');
  const lang = AppState.lang || 'mr';
  const sc = SETTINGS_CONTENT[lang] || SETTINGS_CONTENT['mr'];
  const curSize  = localStorage.getItem('cs_fontsize') || 'font-md';
  const curSpeed = localStorage.getItem('cs_voice_speed') || 'normal';

  // Progress
  const trackable = ['explainer','evm','quiz','myths','rules','certificate'];
  const done = AppState.completedScreens || [];
  const pct  = Math.round((done.length / trackable.length) * 100);

  const langFlags = [
    { code:'mr', flag:'🇮🇳', label:'मराठी' },
    { code:'hi', flag:'🇮🇳', label:'हिंदी' },
    { code:'en', flag:'🇬🇧', label:'English' }
  ];

  el.innerHTML = `
    <div class="settings-screen">

      <!-- LANGUAGE -->
      <div class="settings-section">
        <div class="settings-section-title">${sc.settings_lang}</div>
        <div class="settings-lang-row">
          ${langFlags.map(lf => `
            <button class="settings-lang-btn ${lang === lf.code ? 'active' : ''}"
              onclick="settingsSetLang('${lf.code}')">
              <span class="settings-lang-flag">${lf.flag}</span>
              <span class="settings-lang-label">${lf.label}</span>
              ${lang === lf.code ? '<span class="settings-check">✓</span>' : ''}
            </button>`).join('')}
        </div>
      </div>

      <!-- TEXT SIZE -->
      <div class="settings-section">
        <div class="settings-section-title">${sc.settings_textsize}</div>
        <div class="settings-chip-row">
          ${[['font-sm', sc.settings_small,'A'],['font-md', sc.settings_medium,'A'],['font-lg', sc.settings_large,'A']].map(([cls, lbl, a], i) => `
            <button class="settings-chip ${curSize === cls ? 'active' : ''}"
              style="font-size:${14+i*3}px"
              onclick="settingsSetFontSize('${cls}')">
              ${lbl}
            </button>`).join('')}
        </div>
      </div>

      <!-- VOICE SPEED -->
      <div class="settings-section">
        <div class="settings-section-title">${sc.settings_voice_speed}</div>
        <div class="settings-chip-row">
          ${[['slow', sc.settings_slow, 0.7],['normal', sc.settings_normal, 1.0],['fast', sc.settings_fast, 1.4]].map(([k,lbl]) => `
            <button class="settings-chip ${curSpeed === k ? 'active' : ''}"
              onclick="settingsSetVoiceSpeed('${k}')">
              ${lbl}
            </button>`).join('')}
        </div>
      </div>

      <!-- PROGRESS -->
      <div class="settings-section">
        <div class="settings-section-title">${sc.settings_progress}</div>
        <div class="settings-progress-bar-wrap">
          <div class="settings-progress-bar" style="width:${pct}%"></div>
        </div>
        <div class="settings-progress-pct">${pct}% ${sc.settings_screens_done}</div>
        <div class="settings-screens-grid">
          ${trackable.map(s => `
            <div class="settings-screen-chip ${done.includes(s) ? 'done' : ''}">
              ${done.includes(s) ? '✅' : '🔒'} ${s}
            </div>`).join('')}
        </div>
      </div>

      <!-- RESET -->
      <div class="settings-section">
        <button class="btn settings-reset-btn" onclick="settingsReset()">
          🗑️ ${sc.settings_reset}
        </button>
      </div>

      <div id="google_translate_element" style="margin-top:16px;opacity:0.7;"></div>
    </div>
    <script>
      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'mr',
          includedLanguages: 'mr,hi,en,gu,ta,te,bn',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      }
    </script>
    <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    `;

  setVoiceText(sc.settings_title);
}

/**
 * Changes language from settings
 * @param {string} code - Language code
 * @returns {void}
 */
function settingsSetLang(code) {
  AppState.setLang(code);
  renderSettings();
  // Re-render current screen if it's not settings
  if (AppState.screen !== 'settings') navigate(AppState.screen);
}

/**
 * Sets text size from settings
 * @param {string} cls - Font size class
 * @returns {void}
 */
function settingsSetFontSize(cls) {
  localStorage.setItem('cs_fontsize', cls);
  document.body.classList.remove('font-sm','font-md','font-lg');
  document.body.classList.add(cls);
  renderSettings();
}

/**
 * Sets voice speed from settings
 * @param {string} k - Speed key
 * @returns {void}
 */
function settingsSetVoiceSpeed(k) {
  localStorage.setItem('cs_voice_speed', k);
  renderSettings();
}

/**
 * Resets all user progress and data
 * @returns {void}
 */
function settingsReset() {
  const lang = AppState.lang || 'mr';
  const sc = SETTINGS_CONTENT[lang] || SETTINGS_CONTENT['mr'];
  if (!confirm(sc.settings_reset_confirm)) return;
  localStorage.clear();
  location.reload();
}
