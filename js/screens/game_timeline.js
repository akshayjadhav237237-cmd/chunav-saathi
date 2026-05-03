let gtState = { order: [], submitted: false, score: 0 };

function renderGameTimeline() {
  const el = document.getElementById('screen-game_timeline');
  const lang = AppState.lang || 'mr';
  const data = CONTENT[lang].games;
  
  if (gtState.order.length === 0) {
    // initialize shuffled array
    gtState.order = [...data.timeline_stages].sort(() => Math.random() - 0.5);
    gtState.submitted = false;
    gtState.score = 0;
  }
  
  let cardsHTML = gtState.order.map((item, idx) => {
    let statusClass = '';
    let statusIcon = '';
    if (gtState.submitted) {
      if (item.order === idx + 1) {
        statusClass = 'correct';
        statusIcon = '✅';
      } else {
        statusClass = 'wrong';
        statusIcon = '❌';
      }
    }
    
    return `
      <div class="timeline-card ${statusClass}">
        <div>
          <span style="font-weight:bold; margin-right:10px;">${idx + 1}.</span>
          ${item.label} ${statusIcon}
        </div>
        ${!gtState.submitted ? `
        <div>
          <button onclick="gtMove(${idx}, -1)" style="padding:5px 10px; margin-right:5px; border:1px solid #ccc; background:#eee; border-radius:4px;" ${idx===0?'disabled':''}>↑</button>
          <button onclick="gtMove(${idx}, 1)" style="padding:5px 10px; border:1px solid #ccc; background:#eee; border-radius:4px;" ${idx===gtState.order.length-1?'disabled':''}>↓</button>
        </div>
        ` : ''}
      </div>
    `;
  }).join('');
  
  let correctOrderHTML = '';
  if (gtState.submitted) {
    correctOrderHTML = `
      <div style="margin-top:20px; padding:15px; background:#E8F5E9; border-radius:8px;">
        <h4 style="margin:0 0 10px 0;">Correct Sequence:</h4>
        <ol style="margin:0; padding-left:20px; font-size:14px;">
          ${data.timeline_stages.sort((a,b)=>a.order-b.order).map(s => `<li>${s.label}</li>`).join('')}
        </ol>
      </div>
    `;
  }
  
  el.innerHTML = `
    <div style="padding:20px;">
      <h2>${data.timeline_title}</h2>
      <p style="margin-bottom:20px;">योग्य क्रम लावा (Arrange in order)</p>
      
      <div id="gt-cards">
        ${cardsHTML}
      </div>
      
      ${gtState.submitted ? `
        <h3 style="text-align:center; margin-top:20px;">Score: ${gtState.score} / ${data.timeline_stages.length}</h3>
        ${correctOrderHTML}
        <button class="btn btn-primary" style="width:100%; margin-top:20px;" onclick="gtState.order=[]; renderGameTimeline();">Play Again</button>
      ` : `
        <button class="btn btn-primary" style="width:100%; margin-top:20px;" onclick="gtSubmit()">Submit</button>
      `}
    </div>
  `;
}

window.gtMove = function(idx, dir) {
  let temp = gtState.order[idx];
  gtState.order[idx] = gtState.order[idx + dir];
  gtState.order[idx + dir] = temp;
  renderGameTimeline();
}

window.gtSubmit = function() {
  gtState.submitted = true;
  gtState.score = 0;
  gtState.order.forEach((item, idx) => {
    if (item.order === idx + 1) gtState.score++;
  });
  AppState.markComplete('game_timeline');
  renderGameTimeline();
}
