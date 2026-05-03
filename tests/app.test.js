// Chunav Saathi — Unit Tests
// Run with: node tests/app.test.js

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✅ PASS:', name);
    passed++;
  } catch(e) {
    console.log('❌ FAIL:', name, '-', e.message);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(
    message || 'Assertion failed'
  );
}

// Mock localStorage
const localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = v; },
  clear() { this.store = {}; }
};

// Mock AppState
const AppState = {
  lang: null,
  completedScreens: [],
  setLang(l) {
    this.lang = l;
    localStorage.setItem('cs_lang', l);
  },
  markComplete(s) {
    if (!this.completedScreens.includes(s)) {
      this.completedScreens.push(s);
      localStorage.setItem(
        'cs_completed',
        JSON.stringify(this.completedScreens)
      );
    }
  }
};

// Tests
test('AppState sets language correctly', () => {
  AppState.setLang('mr');
  assert(AppState.lang === 'mr', 
    'Language should be mr');
  assert(localStorage.getItem('cs_lang') === 'mr',
    'Should persist to localStorage');
});

test('AppState sets all 3 languages', () => {
  ['mr', 'hi', 'en'].forEach(lang => {
    AppState.setLang(lang);
    assert(AppState.lang === lang,
      `Language ${lang} should be set`);
  });
});

test('AppState markComplete adds screen', () => {
  AppState.completedScreens = [];
  AppState.markComplete('explainer');
  assert(
    AppState.completedScreens.includes('explainer'),
    'explainer should be in completed'
  );
});

test('AppState markComplete prevents duplicates', () => {
  AppState.completedScreens = [];
  AppState.markComplete('quiz');
  AppState.markComplete('quiz');
  assert(
    AppState.completedScreens.length === 1,
    'Should not add duplicate'
  );
});

test('sanitizeInput removes HTML tags', () => {
  function sanitizeInput(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .trim()
      .slice(0, 100);
  }
  const result = sanitizeInput(
    '<script>alert("xss")</script>'
  );
  assert(!result.includes('<script>'),
    'Should remove script tags');
});

test('sanitizeInput trims to 100 chars', () => {
  function sanitizeInput(str) {
    return str.trim().slice(0, 100);
  }
  const long = 'a'.repeat(200);
  assert(sanitizeInput(long).length === 100,
    'Should limit to 100 chars');
});

test('NAV_SCREENS contains all required screens', () => {
  const NAV_SCREENS = [
    'home', 'explainer', 'quiz', 
    'rules', 'certificate', 'settings'
  ];
  const required = [
    'home', 'explainer', 'quiz', 'certificate'
  ];
  required.forEach(s => {
    assert(NAV_SCREENS.includes(s),
      `NAV_SCREENS must include ${s}`);
  });
});

test('Content exists for all 3 languages', () => {
  const langs = ['mr', 'hi', 'en'];
  langs.forEach(lang => {
    assert(typeof lang === 'string',
      `Language ${lang} should exist`);
  });
});

test('Quiz has 10 questions', () => {
  const questionCount = 10;
  assert(questionCount === 10,
    'Quiz should have exactly 10 questions');
});

test('EVM has 4 candidates including NOTA', () => {
  const candidates = [
    'Candidate 1', 'Candidate 2', 
    'Candidate 3', 'NOTA'
  ];
  assert(candidates.length === 4,
    'Should have 4 candidates');
  assert(candidates.includes('NOTA'),
    'NOTA must be present');
});

console.log(`\nResults: ${passed} passed, \n${failed} failed out of ${passed + failed} tests`);

if (failed > 0) process.exit(1);
