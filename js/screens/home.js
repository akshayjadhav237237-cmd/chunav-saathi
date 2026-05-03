// CHUNAV SAATHI — home.js
/**
 * Renders the Home screen
 * @returns {void}
 */
function renderHome() {
  const el = document.getElementById('screen-home');
  const cards = t('home_cards');
  const lang = AppState.lang || 'mr';
  // Build game cards from game data
  const gvd = (typeof GAME_VOTING_DAY_DATA !== 'undefined') ? GAME_VOTING_DAY_DATA[lang] || GAME_VOTING_DAY_DATA['mr'] : null;
  const gs  = (typeof GAME_SPOT_DATA !== 'undefined') ? GAME_SPOT_DATA[lang] || GAME_SPOT_DATA['mr'] : null;
  const gt  = (typeof GAME_TIMELINE_DATA !== 'undefined') ? GAME_TIMELINE_DATA[lang] || GAME_TIMELINE_DATA['mr'] : null;
  const gameCards = [
    gvd ? { icon:'🗓️', label: gvd.title, screen:'game_voting_day', desc: gvd.subtitle } : null,
    gs  ? { icon:'🔎', label: gs.title,  screen:'game_spot',        desc: gs.subtitle  } : null,
    gt  ? { icon:'📅', label: gt.title,  screen:'game_timeline',    desc: gt.subtitle  } : null,
  ].filter(Boolean);
  const allCards = [...cards, ...gameCards];

  el.innerHTML = `
    <div class="home-hero">
      <div class="home-greeting">${t('home_greeting')}</div>
      <div class="home-title">${t('home_title')}</div>
      <div class="home-subtitle">${t('home_subtitle')}</div>
    </div>
    <div class="home-grid">
      ${allCards.map((c, i) => `
        <div class="home-card ${i === 0 ? 'featured' : ''}" onclick="navigate('${c.screen}')"
          role="button" tabindex="0" style="animation:fadeInUp ${0.1 + i * 0.07}s ease both">
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
