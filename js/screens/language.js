// CHUNAV SAATHI — language.js
/**
 * Renders the initial Language Selection screen
 * @returns {void}
 */
function renderLanguageScreen() {
  const app = document.getElementById('app');
  const ls = document.createElement('div');
  ls.id = 'lang-screen';
  ls.className = 'screen active';
  ls.style.cssText = 'position:absolute;inset:0;z-index:500;background:var(--bg-page);overflow-y:auto';

  const langs = [
    { code: 'mr', flag: '🇮🇳', primary: 'मराठी', secondary: 'Marathi' },
    { code: 'hi', flag: '🇮🇳', primary: 'हिंदी', secondary: 'Hindi' },
    { code: 'en', flag: '🇬🇧', primary: 'English', secondary: 'English' }
  ];

  ls.innerHTML = `
    <div class="lang-screen">
      <div class="lang-logo">
        <div class="lang-logo-icon">🗳️</div>
        <div class="lang-title">चुनाव साथी</div>
        <div class="lang-subtitle">भाषा निवडा · भाषा चुनें · Select Language</div>
      </div>
      <div class="lang-options">
        ${langs.map(l => `
          <button class="lang-btn" id="lang-btn-${l.code}" onclick="selectLang('${l.code}')">
            <span class="lang-btn-flag">${l.flag}</span>
            <span class="lang-btn-text">
              <span class="lang-btn-primary">${l.primary}</span>
              <span class="lang-btn-secondary">${l.secondary}</span>
            </span>
            <span class="lang-btn-check">✓</span>
          </button>`).join('')}
      </div>
      <button class="btn btn-primary" id="lang-continue-btn" onclick="confirmLang()" style="margin-top:8px;display:none">
        पुढे जा · आगे → Continue
      </button>
    </div>`;

  app.appendChild(ls);
}

let _pendingLang = null;
function selectLang(code) {
  _pendingLang = code;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('selected'));
  const btn = document.getElementById('lang-btn-' + code);
  if (btn) btn.classList.add('selected');
  const cont = document.getElementById('lang-continue-btn');
  if (cont) cont.style.display = 'flex';
}

function confirmLang() {
  if (_pendingLang) onLanguageSelected(_pendingLang);
}
