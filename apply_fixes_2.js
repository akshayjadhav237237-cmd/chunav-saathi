const fs = require('fs');

let appJs = fs.readFileSync('js/app.js', 'utf8');

// Add JSDoc, Error Handling, Validation, Lazy Loading to app.js
const appJsNew = `// CHUNAV SAATHI — app.js — Router, State, Navigation, SW registration

/**
 * Global application state object
 * @type {Object}
 */
const AppState = {
  lang: localStorage.getItem(STORAGE_KEYS.LANG) || null,
  screen: 'home',
  completedScreens: (() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED) || '[]');
      return Array.isArray(saved) ? saved.filter(s => NAV_SCREENS.includes(s)) : [];
    } catch(e) {
      console.error('State parse error:', e);
      return [];
    }
  })(),
  userName: localStorage.getItem(STORAGE_KEYS.NAME) || '',

  /**
   * Sets the application language
   * @param {string} l - Language code (mr, hi, en)
   * @returns {void}
   */
  setLang(l) {
    if (!SUPPORTED_LANGS.includes(l)) return;
    this.lang = l;
    localStorage.setItem(STORAGE_KEYS.LANG, l);
    document.documentElement.lang = l === 'en' ? 'en' : l === 'hi' ? 'hi' : 'mr';
    if(typeof gtag !== 'undefined') gtag('event', 'language_changed', { new_language: l });
  },

  /**
   * Marks a screen as completed
   * @param {string} s - Screen identifier
   * @returns {void}
   */
  markComplete(s) {
    if (!NAV_SCREENS.includes(s)) return;
    if (typeof s !== 'string') return;
    if (!this.completedScreens.includes(s)) {
      this.completedScreens.push(s);
      localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(this.completedScreens));
      if(typeof gtag !== 'undefined') gtag('event', 'screen_complete', { screen_name: s });
    }
  }
};

/**
 * Translates a given key based on current language
 * @param {string} key - The key to translate
 * @returns {string|Array} Translated content
 */
function t(key) {
  const lang = AppState.lang || 'mr';
  const sc = (typeof SETTINGS_CONTENT !== 'undefined') ? SETTINGS_CONTENT[lang] || SETTINGS_CONTENT['mr'] : {};
  return (CONTENT[lang] && CONTENT[lang][key]) || CONTENT['mr'][key] || sc[key] || key;
}

const renderCache = {};

/**
 * Navigates to a screen and renders it using lazy rendering
 * @param {string} screen - Screen identifier
 * @returns {void}
 */
function navigate(screen) {
  try {
    Voice.stop();
    AppState.screen = screen;

    const screenContainer = document.getElementById('screen-container');
    if (screenContainer) screenContainer.style.overflowX = (screen === 'evm') ? 'visible' : '';

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen-' + screen);
    if (target) target.classList.add('active');

    document.querySelectorAll('.bottom-nav-item').forEach(btn => {
      const isSelected = btn.dataset.screen === screen;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-selected', isSelected.toString());
    });

    const lang = AppState.lang || 'mr';
    const sc = (typeof SETTINGS_CONTENT !== 'undefined') ? SETTINGS_CONTENT[lang] || SETTINGS_CONTENT['mr'] : {};
    const gvd = (typeof GAME_VOTING_DAY_DATA !== 'undefined') ? GAME_VOTING_DAY_DATA[lang] || GAME_VOTING_DAY_DATA['mr'] : {};
    const gs = (typeof GAME_SPOT_DATA !== 'undefined') ? GAME_SPOT_DATA[lang] || GAME_SPOT_DATA['mr'] : {};
    const gt = (typeof GAME_TIMELINE_DATA !== 'undefined') ? GAME_TIMELINE_DATA[lang] || GAME_TIMELINE_DATA['mr'] : {};
    const titles = {
      home: APP_NAME, explainer: t('explainer_title'), quiz: t('quiz_title'),
      rules: t('rules_title'), certificate: t('cert_title'), evm: t('evm_title'),
      myths: t('myths_title'), settings: sc.settings_title || 'Settings',
      game_voting_day: gvd.title || 'Voting Day', game_spot: gs.title || 'Spot the Violation',
      game_timeline: gt.title || 'Election Timeline'
    };
    const titleEl = document.getElementById('top-bar-title');
    if (titleEl) titleEl.textContent = titles[screen] || APP_NAME;

    const backBtn = document.getElementById('top-bar-back');
    if (backBtn) backBtn.style.display = screen === 'home' ? 'none' : 'flex';

    const container = document.getElementById('screen-container');
    if (container) container.scrollTop = 0;

    const dynamicScreens = ['home', 'certificate', 'settings', 'game_voting_day', 'game_spot', 'game_timeline', 'quiz', 'evm'];
    const renderers = {
      home: renderHome, explainer: renderExplainer, evm: renderEvm, quiz: renderQuiz,
      myths: renderMyths, rules: renderRules, certificate: renderCertificate,
      settings: renderSettings, game_voting_day: renderGameVotingDay,
      game_spot: renderGameSpot, game_timeline: renderGameTimeline
    };
    
    if (!renderCache[screen] || dynamicScreens.includes(screen)) {
      if (renderers[screen]) {
        renderers[screen]();
        renderCache[screen] = true;
      }
    }

    if(typeof gtag !== 'undefined') {
      gtag('event', 'screen_view', { screen_name: screen, app_name: 'ChunawSaathi' });
    }

    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  } catch(e) {
    console.error('Render error:', screen, e);
    showToast('Something went wrong. Try again.');
  }
}

/**
 * Shows a toast message
 * @param {string} msg - Message to show
 * @param {number} [duration=2800] - Duration in ms
 * @returns {void}
 */
function showToast(msg, duration = 2800) {
  try {
    let toast = document.getElementById('app-toast');
    if (!toast) { 
      toast = document.createElement('div'); 
      toast.id = 'app-toast'; 
      toast.className = 'toast'; 
      document.getElementById('app').appendChild(toast); 
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
  } catch(e) {
    console.error('Toast error:', e);
  }
}

/**
 * Builds the application shell UI
 * @returns {void}
 */
function buildShell() {
  try {
    const app = document.getElementById('app');

    const topBar = document.createElement('div');
    topBar.className = 'top-bar';
    topBar.innerHTML = \`
      <button class="top-bar-back" id="top-bar-back" aria-label="Go back" onclick="navigate('home')" style="display:none">‹</button>
      <span class="top-bar-title" id="top-bar-title">\${APP_NAME}</span>
      <button class="top-bar-voice" id="top-bar-voice" aria-label="Read page aloud" aria-live="polite" onclick="debouncedVoice()">🔊</button>\`;

    const tricolor = document.createElement('div');
    tricolor.className = 'tricolor-bar';
    tricolor.innerHTML = '<span></span><span></span><span></span>';

    const container = document.createElement('div');
    container.className = 'screen-container';
    container.id = 'screen-container';
    container.setAttribute('role', 'main');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    NAV_SCREENS.forEach(s => {
      const div = document.createElement('div');
      div.className = 'screen';
      div.id = 'screen-' + s;
      container.appendChild(div);
    });

    const scLang = AppState.lang || 'mr';
    const scLabels = (typeof SETTINGS_CONTENT !== 'undefined') ? SETTINGS_CONTENT[scLang] || SETTINGS_CONTENT['mr'] : {};
    const navItems = [
      { screen:'home', icon:'🏠', label: t('nav_home') },
      { screen:'explainer', icon:'🗳️', label: t('nav_learn') },
      { screen:'quiz', icon:'🧠', label: t('nav_quiz') },
      { screen:'rules', icon:'📋', label: t('nav_rules') },
      { screen:'certificate', icon:'🏆', label: t('nav_cert') },
      { screen:'settings', icon:'⚙️', label: scLabels.nav_settings || 'Settings' }
    ];
    const bottomNav = document.createElement('nav');
    bottomNav.className = 'bottom-nav';
    bottomNav.innerHTML = navItems.map(n => \`
      <button class="bottom-nav-item" data-screen="\${n.screen}" onclick="navigate('\${n.screen}')" aria-label="\${n.label}" role="tab" aria-selected="false">
        <span class="bottom-nav-icon">\${n.icon}</span>
        <span class="bottom-nav-label">\${n.label}</span>
      </button>\`).join('');

    const fab = document.createElement('button');
    fab.className = 'voice-fab';
    fab.id = 'voice-fab';
    fab.setAttribute('aria-label', 'Read page aloud');
    fab.setAttribute('aria-live', 'polite');
    fab.textContent = '🔊';
    fab.onclick = debouncedVoice;

    app.appendChild(topBar);
    app.appendChild(tricolor);
    app.appendChild(container);
    app.appendChild(bottomNav);
    app.appendChild(fab);
  } catch(e) {
    console.error('Shell build error:', e);
  }
}

let currentVoiceText = '';

/**
 * Sets text for voice synthesis
 * @param {string} text - Text to speak
 * @returns {void}
 */
function setVoiceText(text) { currentVoiceText = text; }

/**
 * Toggles voice synthesis
 * @returns {void}
 */
function onVoiceFab() { 
  try {
    Voice.toggle(currentVoiceText, AppState.lang); 
  } catch(e) {
    console.error('Voice error:', e);
  }
}

/**
 * Debounce utility
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {Function}
 */
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const debouncedVoice = debounce(onVoiceFab, 300);

/**
 * Applies saved font size
 * @returns {void}
 */
function applyFontSize() {
  try {
    const sz = localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || 'font-md';
    document.body.classList.remove('font-sm','font-md','font-lg');
    document.body.classList.add(sz);
  } catch(e) {
    console.error('Font apply error:', e);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  applyFontSize();
  setTimeout(() => {
    const splash = document.querySelector('.splash-screen');
    if (splash) {
      splash.classList.add('hiding');
      setTimeout(() => splash.remove(), 500);
    }
    if (!AppState.lang) {
      renderLanguageScreen();
    } else {
      buildShell();
      navigate('home');
    }
  }, 2200);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((e) => {
      console.error('SW error:', e);
    });
  }
});

/**
 * Handles language selection from start screen
 * @param {string} lang - Language code
 * @returns {void}
 */
function onLanguageSelected(lang) {
  try {
    AppState.setLang(lang);
    const ls = document.getElementById('lang-screen');
    if (ls) ls.remove();
    buildShell();
    navigate('home');
  } catch(e) {
    console.error('Lang select error:', e);
  }
}
`;
fs.writeFileSync('js/app.js', appJsNew);
console.log('app.js successfully updated.');
