// CHUNAV SAATHI — app.js — Router, State, Navigation, SW registration

const AppState = {
  lang: localStorage.getItem('cs_lang') || null,
  screen: 'home',
  completedScreens: JSON.parse(localStorage.getItem('cs_completed') || '[]'),
  userName: localStorage.getItem('cs_name') || '',

  setLang(l) {
    this.lang = l;
    localStorage.setItem('cs_lang', l);
    document.documentElement.lang = l === 'en' ? 'en' : 'hi';
  },
  markComplete(s) {
    if (!this.completedScreens.includes(s)) {
      this.completedScreens.push(s);
      localStorage.setItem('cs_completed', JSON.stringify(this.completedScreens));
    }
  }
};

function t(key) {
  const lang = AppState.lang || 'mr';
  return (CONTENT[lang] && CONTENT[lang][key]) || CONTENT['mr'][key] || key;
}

// ── Navigation ──────────────────────────────────────────────
const NAV_SCREENS = ['home', 'explainer', 'quiz', 'rules', 'certificate'];

function navigate(screen) {
  Voice.stop();
  AppState.screen = screen;

  // Show/hide screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + screen);
  if (target) target.classList.add('active');

  // Update bottom nav
  document.querySelectorAll('.bottom-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screen);
  });

  // Update top bar title
  const titles = { home: t('app_name'), explainer: t('explainer_title'), quiz: t('quiz_title'), rules: t('rules_title'), certificate: t('cert_title'), evm: t('evm_title'), myths: t('myths_title') };
  const titleEl = document.getElementById('top-bar-title');
  if (titleEl) titleEl.textContent = titles[screen] || t('app_name');

  // Show/hide back button
  const backBtn = document.getElementById('top-bar-back');
  if (backBtn) backBtn.style.display = screen === 'home' ? 'none' : 'flex';

  // Scroll to top
  const container = document.getElementById('screen-container');
  if (container) container.scrollTop = 0;

  // Render screen
  const renderers = { home: renderHome, explainer: renderExplainer, evm: renderEvm, quiz: renderQuiz, myths: renderMyths, rules: renderRules, certificate: renderCertificate };
  if (renderers[screen]) renderers[screen]();
}

// ── Toast ───────────────────────────────────────────────────
function showToast(msg, duration = 2800) {
  let toast = document.getElementById('app-toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'app-toast'; toast.className = 'toast'; document.getElementById('app').appendChild(toast); }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Build Shell ─────────────────────────────────────────────
function buildShell() {
  const app = document.getElementById('app');

  // Top bar
  const topBar = document.createElement('div');
  topBar.className = 'top-bar';
  topBar.innerHTML = `
    <button class="top-bar-back" id="top-bar-back" aria-label="Back" onclick="navigate('home')" style="display:none">‹</button>
    <span class="top-bar-title" id="top-bar-title">${t('app_name')}</span>
    <button class="top-bar-voice" id="top-bar-voice" aria-label="Voice" onclick="onVoiceFab()">🔊</button>`;

  // Tricolor
  const tricolor = document.createElement('div');
  tricolor.className = 'tricolor-bar';
  tricolor.innerHTML = '<span></span><span></span><span></span>';

  // Screen container with all screens
  const container = document.createElement('div');
  container.className = 'screen-container';
  container.id = 'screen-container';
  ['home','explainer','evm','quiz','myths','rules','certificate'].forEach(s => {
    const div = document.createElement('div');
    div.className = 'screen';
    div.id = 'screen-' + s;
    container.appendChild(div);
  });

  // Bottom nav
  const navItems = [
    { screen:'home', icon:'🏠', label: t('nav_home') },
    { screen:'explainer', icon:'🗳️', label: t('nav_learn') },
    { screen:'quiz', icon:'🧠', label: t('nav_quiz') },
    { screen:'rules', icon:'📋', label: t('nav_rules') },
    { screen:'certificate', icon:'🏆', label: t('nav_cert') }
  ];
  const bottomNav = document.createElement('nav');
  bottomNav.className = 'bottom-nav';
  bottomNav.innerHTML = navItems.map(n => `
    <button class="bottom-nav-item" data-screen="${n.screen}" onclick="navigate('${n.screen}')" aria-label="${n.label}">
      <span class="bottom-nav-icon">${n.icon}</span>
      <span class="bottom-nav-label">${n.label}</span>
    </button>`).join('');

  // Voice FAB
  const fab = document.createElement('button');
  fab.className = 'voice-fab';
  fab.id = 'voice-fab';
  fab.setAttribute('aria-label', 'Voice');
  fab.textContent = '🔊';
  fab.onclick = onVoiceFab;

  app.appendChild(topBar);
  app.appendChild(tricolor);
  app.appendChild(container);
  app.appendChild(bottomNav);
  app.appendChild(fab);
}

let currentVoiceText = '';
function setVoiceText(text) { currentVoiceText = text; }
function onVoiceFab() { Voice.toggle(currentVoiceText, AppState.lang); }

// ── Init ────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Remove splash after 2.2s
  setTimeout(() => {
    const splash = document.querySelector('.splash-screen');
    if (splash) {
      splash.classList.add('hiding');
      setTimeout(() => splash.remove(), 500);
    }
    // Show language screen if no lang set
    if (!AppState.lang) {
      renderLanguageScreen();
    } else {
      buildShell();
      navigate('home');
    }
  }, 2200);

  // Register SW
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});

function onLanguageSelected(lang) {
  AppState.setLang(lang);
  // Remove language screen
  const ls = document.getElementById('lang-screen');
  if (ls) ls.remove();
  buildShell();
  navigate('home');
}
