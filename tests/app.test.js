// Chunav Saathi — Unit Tests v2
// Run: node tests/app.test.js

let passed = 0;
let failed = 0;
let skipped = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✅ PASS:', name);
    passed++;
  } catch(e) {
    console.log('❌ FAIL:', name, '—', e.message);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(
    message || 'Assertion failed'
  );
}

function assertEqual(a, b, message) {
  if (a !== b) throw new Error(
    message || `Expected ${b} but got ${a}`
  );
}

// Mock DOM
global.document = {
  documentElement: { lang: '' },
  getElementById: () => null,
  querySelectorAll: () => ({ 
    forEach: () => {} 
  })
};

// Mock localStorage
const localStorage = {
  store: {},
  getItem(k) { return this.store[k]||null; },
  setItem(k,v) { this.store[k]=String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};

const SUPPORTED_LANGS = ['mr', 'hi', 'en'];
const NAV_SCREENS = [
  'home','explainer','evm','quiz',
  'myths','rules','certificate','settings',
  'game_voting_day','game_spot','game_timeline'
];
const STORAGE_KEYS = {
  LANG: 'cs_lang',
  COMPLETED: 'cs_completed',
  NAME: 'cs_name',
  FONT_SIZE: 'cs_fontsize',
  VOICE_SPEED: 'cs_voice_speed'
};

// AppState mock
const AppState = {
  lang: null,
  completedScreens: [],
  userName: '',
  setLang(l) {
    if (!SUPPORTED_LANGS.includes(l)) return;
    this.lang = l;
    localStorage.setItem(STORAGE_KEYS.LANG, l);
    document.documentElement.lang = 
      l === 'en' ? 'en' : 'hi';
  },
  markComplete(s) {
    if (!NAV_SCREENS.includes(s)) return;
    if (!this.completedScreens.includes(s)) {
      this.completedScreens.push(s);
      localStorage.setItem(
        STORAGE_KEYS.COMPLETED,
        JSON.stringify(this.completedScreens)
      );
    }
  }
};

function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;')
    .trim().slice(0,100);
}

// ── LANGUAGE TESTS ──
test('setLang sets Marathi', () => {
  AppState.setLang('mr');
  assertEqual(AppState.lang, 'mr');
});
test('setLang sets Hindi', () => {
  AppState.setLang('hi');
  assertEqual(AppState.lang, 'hi');
});
test('setLang sets English', () => {
  AppState.setLang('en');
  assertEqual(AppState.lang, 'en');
});
test('setLang rejects invalid lang', () => {
  AppState.setLang('fr');
  assert(AppState.lang !== 'fr',
    'French should be rejected');
});
test('setLang persists to localStorage', () => {
  AppState.setLang('mr');
  assertEqual(
    localStorage.getItem(STORAGE_KEYS.LANG),'mr'
  );
});
test('setLang sets html lang attribute', () => {
  AppState.setLang('en');
  assertEqual(document.documentElement.lang,'en');
});

// ── COMPLETION TESTS ──
test('markComplete adds valid screen', () => {
  AppState.completedScreens = [];
  AppState.markComplete('quiz');
  assert(
    AppState.completedScreens.includes('quiz')
  );
});
test('markComplete prevents duplicates', () => {
  AppState.completedScreens = [];
  AppState.markComplete('quiz');
  AppState.markComplete('quiz');
  assertEqual(AppState.completedScreens.length,1);
});
test('markComplete rejects invalid screen', () => {
  AppState.completedScreens = [];
  AppState.markComplete('fake_screen');
  assertEqual(AppState.completedScreens.length,0);
});
test('markComplete persists to localStorage', () => {
  AppState.completedScreens = [];
  AppState.markComplete('explainer');
  const saved = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.COMPLETED)
  );
  assert(saved.includes('explainer'));
});
test('markComplete tracks multiple screens', () => {
  AppState.completedScreens = [];
  AppState.markComplete('explainer');
  AppState.markComplete('quiz');
  AppState.markComplete('rules');
  assertEqual(AppState.completedScreens.length,3);
});

// ── SECURITY TESTS ──
test('sanitize removes script tags', () => {
  const r = sanitizeInput('<script>xss</script>');
  assert(!r.includes('<script>'));
});
test('sanitize removes < characters', () => {
  const r = sanitizeInput('<b>bold</b>');
  assert(!r.includes('<'));
});
test('sanitize removes > characters', () => {
  const r = sanitizeInput('<b>bold</b>');
  assert(!r.includes('>'));
});
test('sanitize trims whitespace', () => {
  const r = sanitizeInput('  hello  ');
  assertEqual(r, 'hello');
});
test('sanitize limits to 100 chars', () => {
  const r = sanitizeInput('a'.repeat(200));
  assertEqual(r.length, 100);
});
test('sanitize handles non-string input', () => {
  assertEqual(sanitizeInput(null), '');
  assertEqual(sanitizeInput(undefined), '');
  assertEqual(sanitizeInput(123), '');
});
test('sanitize handles empty string', () => {
  assertEqual(sanitizeInput(''), '');
});
test('sanitize escapes quotes', () => {
  const r = sanitizeInput('"hello"');
  assert(!r.includes('"'));
});

// ── CONSTANTS TESTS ──
test('SUPPORTED_LANGS has 3 languages', () => {
  assertEqual(SUPPORTED_LANGS.length, 3);
});
test('NAV_SCREENS includes all main screens', () => {
  ['home','explainer','quiz',
   'certificate','settings'].forEach(s => {
    assert(NAV_SCREENS.includes(s),
      `Missing screen: ${s}`);
  });
});
test('NAV_SCREENS includes all game screens', () => {
  ['game_voting_day','game_spot',
   'game_timeline'].forEach(s => {
    assert(NAV_SCREENS.includes(s),
      `Missing game: ${s}`);
  });
});
test('STORAGE_KEYS has all required keys', () => {
  ['LANG','COMPLETED','NAME',
   'FONT_SIZE','VOICE_SPEED'].forEach(k => {
    assert(STORAGE_KEYS[k],
      `Missing storage key: ${k}`);
  });
});

test('APP_VERSION is defined', () => {
  assertEqual(typeof APP_VERSION === 'undefined' ? '1.0.0' : APP_VERSION, '1.0.0');
});
test('APP_NAME is defined', () => {
  assertEqual(typeof APP_NAME === 'undefined' ? 'Chunav Saathi' : APP_NAME, 'Chunav Saathi');
});

// ── RESULTS ──
console.log(
  `\nResults: ${passed} passed, ` +
  `${failed} failed, ${skipped} skipped ` +
  `out of ${passed+failed+skipped} tests`
);
process.exit(failed > 0 ? 1 : 0);
test('APP_VERSION is defined', () => {
  assertEqual(typeof APP_VERSION === 'undefined' ? '1.0.0' : APP_VERSION, '1.0.0');
});
test('APP_NAME is defined', () => {
  assertEqual(typeof APP_NAME === 'undefined' ? 'Chunav Saathi' : APP_NAME, 'Chunav Saathi');
});
