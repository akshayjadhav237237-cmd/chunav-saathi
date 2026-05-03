let gvdState = { step: 0, score: 0, done: false };

/**
 * Renders the Voting Day scenario game
 * @returns {void}
 */
function renderGameVotingDay() {
  const el = document.getElementById('screen-game_voting_day');
  const lang = AppState.lang || 'mr';
  const data = CONTENT[lang].games;
  
  if (gvdState.done) {
    el.innerHTML = `
      <div style="padding:20px; text-align:center;">
        <h2>${data.voting_day_title}</h2>
        <div class="badge-animation">🎉</div>
        <h3>बॅज मिळाला! (Badge Earned!)</h3>
        <p>Score: ${gvdState.score} / 5</p>
        <button class="btn btn-primary" style="margin-top:20px;" onclick="gvdState={step:0,score:0,done:false}; renderGameVotingDay();">Play Again</button>
      </div>
    `;
    return;
  }
  
  const qData = data.voting_day_decisions[gvdState.step];
  
  el.innerHTML = `
    <div style="padding:20px;">
      <h2>${data.voting_day_title}</h2>
      <p>प्रश्न ${gvdState.step + 1} / 5</p>
      <div class="game-question">${qData.q}</div>
      <div id="gvd-opts">
        ${qData.options.map((opt, i) => `<button class="game-option" onclick="gvdPick(${i})">${opt}</button>`).join('')}
      </div>
      <div id="gvd-feedback" style="display:none; margin-top:20px;">
        <div class="game-explanation">${qData.explanation}</div>
        <button class="btn btn-primary" id="gvd-next-btn" style="width:100%"></button>
      </div>
    </div>
  `;
}

/**
 * Handles user selection in Voting Day game
 * @param {number} idx - Index of the chosen option
 * @returns {void}
 */
window.gvdPick = function(idx) {
  const lang = AppState.lang || 'mr';
  const data = CONTENT[lang].games;
  const qData = data.voting_day_decisions[gvdState.step];
  
  const opts = document.getElementById('gvd-opts').children;
  for(let i=0; i<opts.length; i++) opts[i].disabled = true;
  
  const fb = document.getElementById('gvd-feedback');
  const nextBtn = document.getElementById('gvd-next-btn');
  fb.style.display = 'block';
  
  if (idx === qData.correct) {
    opts[idx].classList.add('correct');
    gvdState.score++;
    nextBtn.textContent = 'पुढे जा';
    nextBtn.onclick = () => {
      gvdState.step++;
      if (gvdState.step >= data.voting_day_decisions.length) {
        gvdState.done = true;
        AppState.markComplete('game_voting_day');
        if (typeof gtag !== 'undefined') {
          gtag('event', 'game_complete', {
            game_name: 'game_voting_day',
            language: AppState.lang
          });
        }
      }
      renderGameVotingDay();
    };
  } else {
    opts[idx].classList.add('wrong');
    nextBtn.textContent = 'पुन्हा प्रयत्न करा';
    nextBtn.onclick = () => {
      renderGameVotingDay();
    };
  }
}
