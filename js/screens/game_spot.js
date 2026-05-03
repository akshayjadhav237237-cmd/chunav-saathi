// CHUNAV SAATHI — game_spot.js
let _spotIdx = 0;
let _spotScore = 0;
let _spotAnswered = false;

function renderGameSpot() {
  _spotIdx = 0; _spotScore = 0;
  _renderSpotCard();
}

function _renderSpotCard() {
  const lang = AppState.lang || 'mr';
  const d = GAME_SPOT_DATA[lang] || GAME_SPOT_DATA['mr'];
  const el = document.getElementById('screen-game_spot');

  if (_spotIdx >= d.scenarios.length) {
    const total = d.scenarios.length;
    const pct   = Math.round((_spotScore / total) * 100);
    el.innerHTML = `
      <div class="game-complete-screen">
        <div class="game-complete-emoji">${pct >= 80 ? '🏆' : pct >= 50 ? '⭐' : '📚'}</div>
        <div class="game-score-big">${_spotScore} / ${total}</div>
        <div class="game-complete-msg">${d.finish}</div>
        <button class="btn btn-primary" onclick="renderGameSpot()">${d.restart}</button>
        <button class="btn btn-secondary" style="margin-top:10px" onclick="navigate('home')">← Home</button>
      </div>`;
    if (_spotScore === total) AppState.markComplete('game_spot');
    return;
  }

  const sc = d.scenarios[_spotIdx];
  _spotAnswered = false;

  el.innerHTML = `
    <div class="game-spot-screen">
      <div class="game-progress-bar-wrap">
        <div class="game-progress-bar" style="width:${(_spotIdx/d.scenarios.length)*100}%"></div>
      </div>
      <div class="game-step-badge">${_spotIdx+1} / ${d.scenarios.length} &nbsp;|&nbsp; ${d.score_label}: ${_spotScore}</div>
      <div class="game-scenario-box spot-scenario">
        <div class="game-scenario-icon">🔎</div>
        <div class="game-scenario-q">${sc.scene}</div>
      </div>
      <div class="spot-btn-row">
        <button class="spot-btn violation" id="spot-violation" onclick="spotAnswer(true)">
          ${d.violation_btn}
        </button>
        <button class="spot-btn allowed" id="spot-allowed" onclick="spotAnswer(false)">
          ${d.allowed_btn}
        </button>
      </div>
      <div class="game-explanation" id="spot-exp" style="display:none">
        <div class="game-exp-text" id="spot-exp-text"></div>
        <button class="btn btn-primary" onclick="_spotNext()">→</button>
      </div>
    </div>`;

  setVoiceText(sc.scene);
}

function spotAnswer(userSaidViolation) {
  if (_spotAnswered) return;
  _spotAnswered = true;
  const lang = AppState.lang || 'mr';
  const d = GAME_SPOT_DATA[lang] || GAME_SPOT_DATA['mr'];
  const sc = d.scenarios[_spotIdx];
  const correct = sc.isViolation === userSaidViolation;

  if (correct) _spotScore++;

  const vBtn = document.getElementById('spot-violation');
  const aBtn = document.getElementById('spot-allowed');
  [vBtn, aBtn].forEach(b => b.disabled = true);

  if (userSaidViolation) {
    vBtn.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) aBtn.classList.add('correct');
  } else {
    aBtn.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) vBtn.classList.add('correct');
  }

  const expEl = document.getElementById('spot-exp');
  document.getElementById('spot-exp-text').textContent = (correct ? '✅ ' : '❌ ') + sc.exp;
  expEl.style.display = 'block';
  setVoiceText(sc.exp);
}

function _spotNext() {
  _spotIdx++;
  _renderSpotCard();
}
