// CHUNAV SAATHI — home.js
function renderHome() {
  const el = document.getElementById('screen-home');
  const cards = t('home_cards');
  const lang = AppState.lang || 'mr';

  el.innerHTML = `
    <div class="home-hero">
      <div class="home-greeting">${t('home_greeting')}</div>
      <div class="home-title">${t('home_title')}</div>
      <div class="home-subtitle">${t('home_subtitle')}</div>
    </div>
    <div class="home-grid">
      ${cards.map((c, i) => `
        <div class="home-card ${i === 0 ? 'featured' : ''}" onclick="navigate('${c.screen}')"
          style="animation:fadeInUp ${0.1 + i * 0.07}s ease both">
          <span class="home-card-icon">${c.icon}</span>
          <span>
            <span class="home-card-label">${c.label}</span>
            <span class="home-card-desc" style="display:block">${c.desc}</span>
          </span>
        </div>`).join('')}
    </div>
    <div style="padding:0 var(--space-lg) var(--space-md)">
      <div class="card" style="padding:var(--space-md);display:flex;align-items:center;gap:var(--space-md);background:var(--eci-blue-light)">
        <span style="font-size:28px">📞</span>
        <div>
          <div style="font-weight:var(--font-weight-bold);color:var(--eci-blue);font-size:var(--font-size-sm)">Voter Helpline</div>
          <div style="font-size:var(--font-size-hero);font-weight:var(--font-weight-bold);color:var(--eci-blue)">1950</div>
        </div>
      </div>
    </div>`;

  setVoiceText(t('home_title') + '. ' + t('home_subtitle'));
}
