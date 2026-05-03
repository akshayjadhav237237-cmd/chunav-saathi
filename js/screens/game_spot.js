let gsState = { current: 0, score: 0, answers: [] };

function renderGameSpot() {
  const el = document.getElementById('screen-game_spot');
  const lang = AppState.lang || 'mr';
  const data = CONTENT[lang].games;
  
  if (gsState.current >= data.spot_scenarios.length) {
    let resultHTML = gsState.answers.map((a, i) => {
      const q = data.spot_scenarios[i];
      return `<div style="margin-bottom:10px; padding:10px; border:1px solid #ccc; border-radius:8px;">
        <p><strong>${q.text}</strong></p>
        <p>Your answer: ${a === 'violation' ? '❌' : '✅'} | Correct: ${q.answer === 'violation' ? '❌' : '✅'}</p>
        <p class="game-explanation">${q.explanation}</p>
      </div>`;
    }).join('');
    
    el.innerHTML = `
      <div style="padding:20px;">
        <h2>${data.spot_title}</h2>
        <h3>Score: ${gsState.score} / ${data.spot_scenarios.length}</h3>
        ${resultHTML}
        <button class="btn btn-primary" style="margin-top:20px; width:100%" onclick="gsState={current:0,score:0,answers:[]}; renderGameSpot();">Play Again</button>
      </div>
    `;
    AppState.markComplete('game_spot');
    return;
  }
  
  const qData = data.spot_scenarios[gsState.current];
  
  el.innerHTML = `
    <div style="padding:20px;">
      <h2>${data.spot_title}</h2>
      <p>प्रश्न ${gsState.current + 1} / ${data.spot_scenarios.length}</p>
      <div style="background:white; padding:20px; border-radius:12px; border:2px solid #ccc; margin:20px 0; font-size:18px;">
        ${qData.text}
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:20px;" id="gs-opts">
        <button class="violation-btn" onclick="gsPick('violation')">VIOLATION ❌</button>
        <button class="allowed-btn" onclick="gsPick('allowed')">ALLOWED ✅</button>
      </div>
      <div id="gs-feedback" style="display:none;">
        <div id="gs-feedback-msg" style="font-size:20px; font-weight:bold; text-align:center; margin-bottom:10px;"></div>
        <div class="game-explanation">${qData.explanation}</div>
        <button class="btn btn-primary" style="width:100%" onclick="gsState.current++; renderGameSpot();">पुढे</button>
      </div>
    </div>
  `;
}

window.gsPick = function(ans) {
  const lang = AppState.lang || 'mr';
  const data = CONTENT[lang].games;
  const qData = data.spot_scenarios[gsState.current];
  
  document.getElementById('gs-opts').style.pointerEvents = 'none';
  const fb = document.getElementById('gs-feedback');
  const fbMsg = document.getElementById('gs-feedback-msg');
  
  gsState.answers.push(ans);
  
  if (ans === qData.answer) {
    gsState.score++;
    fbMsg.textContent = '✅ बरोबर (Correct)';
    fbMsg.style.color = '#2E7D32';
  } else {
    fbMsg.textContent = '❌ चुकीचे (Incorrect)';
    fbMsg.style.color = '#C62828';
  }
  
  fb.style.display = 'block';
}
