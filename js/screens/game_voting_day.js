// CHUNAV SAATHI — game_voting_day.js
let _gvdStep = 0;
let _gvdScore = 0;
let _gvdAnswered = false;

function renderGameVotingDay() {
  _gvdStep = 0; _gvdScore = 0;
  _renderGVDStep();
}

function _renderGVDStep() {
  const lang = AppState.lang || 'mr';
  const d = GAME_VOTING_DAY_DATA[lang] || GAME_VOTING_DAY_DATA['mr'];
  const el = document.getElementById('screen-game_voting_day');

  if (_gvdStep >= d.decisions.length) {
    // Completion screen
    const perfect = _gvdScore === d.decisions.length;
    el.innerHTML = `
      <div class="game-complete-screen">
        <div class="game-complete-emoji">${perfect ? '🏆' : '⭐'}</div>
        <div class="game-complete-msg">${d.complete}</div>
        <div class="game-score-big">${_gvdScore} / ${d.decisions.length}</div>
        ${perfect ? '<div class="game-badge">🎖️ Perfect Voter Badge Unlocked!</div>' : ''}
        <button class="btn btn-primary" onclick="renderGameVotingDay()">${d.retry}</button>
        <button class="btn btn-secondary" style="margin-top:10px" onclick="navigate('home')">← Home</button>
      </div>`;
    if (perfect) AppState.markComplete('game_voting_day');
    setVoiceText(d.complete);
    return;
  }

  const dec = d.decisions[_gvdStep];
  _gvdAnswered = false;

  el.innerHTML = `
    <div class="game-vd-screen">
      <div class="game-progress-bar-wrap">
        <div class="game-progress-bar" style="width:${(_gvdStep/d.decisions.length)*100}%"></div>
      </div>
      <div class="game-step-badge">${_gvdStep+1} / ${d.decisions.length}</div>
      <div class="game-scenario-box">
        <div class="game-scenario-icon">🤔</div>
        <div class="game-scenario-q">${dec.q}</div>
      </div>
      <div class="game-options">
        ${dec.opts.map((opt, i) => `
          <button class="game-option-btn" id="gvd-opt-${i}"
            onclick="gvdAnswer(${i}, ${dec.ans})">
            <span class="game-opt-letter">${String.fromCharCode(65+i)}</span>
            ${opt}
          </button>`).join('')}
      </div>
      <div class="game-explanation" id="gvd-exp" style="display:none">
        <div class="game-exp-text">${dec.exp}</div>
        <button class="btn btn-primary" onclick="_gvdNext()">${_gvdStep < d.decisions.length-1 ? d.next : d.finish}</button>
      </div>
    </div>`;

  setVoiceText(dec.q);
}

function gvdAnswer(chosen, correct) {
  if (_gvdAnswered) return;
  _gvdAnswered = true;
  const lang = AppState.lang || 'mr';
  const d = GAME_VOTING_DAY_DATA[lang] || GAME_VOTING_DAY_DATA['mr'];
  const dec = d.decisions[_gvdStep];

  document.querySelectorAll('.game-option-btn').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen && chosen !== correct) btn.classList.add('wrong');
  });

  if (chosen === correct) _gvdScore++;
  document.getElementById('gvd-exp').style.display = 'block';
  setVoiceText(dec.exp);
}

function _gvdNext() {
  _gvdStep++;
  _renderGVDStep();
}
