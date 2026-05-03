const fs = require('fs');

const constantsContent = `const APP_VERSION = '1.0.0';
const APP_NAME = 'Chunav Saathi';
const SUPPORTED_LANGS = ['mr', 'hi', 'en'];
const NAV_SCREENS = [
  'home', 'explainer', 'evm', 
  'quiz', 'myths', 'rules', 
  'certificate', 'settings',
  'game_voting_day', 'game_spot', 
  'game_timeline'
];
const STORAGE_KEYS = {
  LANG: 'cs_lang',
  COMPLETED: 'cs_completed',
  NAME: 'cs_name',
  FONT_SIZE: 'cs_fontsize',
  VOICE_SPEED: 'cs_voice_speed'
};
const EVM_BEEP_FREQUENCY = 800;
const EVM_BEEP_DURATION = 0.3;
const VVPAT_DISPLAY_DURATION = 7000;
`;
fs.writeFileSync('js/constants.js', constantsContent);

let indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('<script src="js/constants.js"></script>')) {
  indexHtml = indexHtml.replace('<script src="js/data/content.js', '<script src="js/constants.js"></script>\n  <script src="js/data/content.js');
}
if (!indexHtml.includes('<link rel="dns-prefetch"')) {
  indexHtml = indexHtml.replace('</head>', `  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">
  <link rel="preload" href="css/screens.css" as="style">
  <link rel="preload" href="js/app.js" as="script">
  <link rel="preload" href="js/data/content.js" as="script">
</head>`);
}
fs.writeFileSync('index.html', indexHtml);

const vercelJson = {
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains" }
      ]
    }
  ]
};
fs.writeFileSync('vercel.json', JSON.stringify(vercelJson, null, 2));

const swJs = `const CACHE_VERSION = 'cs-v1.0.0';
const CACHE_NAME = \`chunav-saathi-\${CACHE_VERSION}\`;

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.destination === 'style' ||
      event.request.destination === 'script' ||
      event.request.destination === 'font') {
    event.respondWith(
      caches.match(event.request).then(cached => 
        cached || fetch(event.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return res;
        })
      )
    );
    return;
  }
  if (event.request.destination === 'document') {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
`;
fs.writeFileSync('sw.js', swJs);

console.log('Script execution complete step 1');
