// CHUNAV SAATHI — rules.js
let _rulesTab = 'do';

/**
 * Renders the Rules screen
 * @returns {void}
 */
function renderRules() {
  _rulesTab = 'do';
  const el = document.getElementById('screen-rules');
  el.innerHTML = `
    <div class="section-header">
      <div class="section-title">${t('rules_title')}</div>
    </div>
    <div class="rules-tabs">
      <button class="rules-tab active" id="tab-do" onclick="switchRulesTab('do')">${t('rules_do')}</button>
      <button class="rules-tab" id="tab-dont" onclick="switchRulesTab('dont')">${t('rules_dont')}</button>
    </div>
    <div class="rules-list">
      <div class="rules-pane active" id="pane-do">${buildRuleItems('dos')}</div>
      <div class="rules-pane" id="pane-dont">${buildRuleItems('donts')}</div>
    </div>`;
  setVoiceText(t('rules_title'));
  AppState.markComplete('rules');
}

function buildRuleItems(type) {
  const lang = AppState.lang || 'mr';
  const items = RULES_DATA[lang][type];
  return items.map(r => `
    <div class="rule-item">
      <div class="rule-icon ${type === 'dos' ? 'do' : 'dont'}">${r.icon}</div>
      <div class="rule-text">
        <div class="rule-title">${r.title}</div>
        <div class="rule-desc">${r.desc}</div>
      </div>
    </div>`).join('');
}

/**
 * Switches the active rules tab
 * @param {string} tab - Tab identifier ('do' or 'dont')
 * @returns {void}
 */
function switchRulesTab(tab) {
  _rulesTab = tab;
  document.querySelectorAll('.rules-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.querySelectorAll('.rules-pane').forEach(p => p.classList.remove('active'));
  document.getElementById('pane-' + tab).classList.add('active');
}
