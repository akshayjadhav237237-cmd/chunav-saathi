// CHUNAV SAATHI — game_timeline.js
let _tlOrder = [];

function renderGameTimeline() {
  const lang = AppState.lang || 'mr';
  const d = GAME_TIMELINE_DATA[lang] || GAME_TIMELINE_DATA['mr'];
  // Shuffle stages
  _tlOrder = [...d.stages].sort(() => Math.random() - 0.5).map(s => s.id);
  _renderTimeline();
}

function _renderTimeline() {
  const lang = AppState.lang || 'mr';
  const d = GAME_TIMELINE_DATA[lang] || GAME_TIMELINE_DATA['mr'];
  const el = document.getElementById('screen-game_timeline');
  const stageMap = {};
  d.stages.forEach(s => stageMap[s.id] = s);

  el.innerHTML = `
    <div class="game-tl-screen">
      <div class="game-tl-intro">${d.intro}</div>
      <div class="game-tl-hint">☝️ Drag cards to reorder</div>
      <div class="game-tl-list" id="tl-list">
        ${_tlOrder.map((id, pos) => {
          const s = stageMap[id];
          return `
            <div class="tl-card" id="tl-card-${id}" draggable="true"
              data-id="${id}" data-pos="${pos}"
              ondragstart="tlDragStart(event)"
              ondragover="tlDragOver(event)"
              ondrop="tlDrop(event)"
              ontouchstart="tlTouchStart(event)"
              ontouchmove="tlTouchMove(event)"
              ontouchend="tlTouchEnd(event)">
              <span class="tl-handle">⠿</span>
              <span class="tl-icon">${s.icon}</span>
              <span class="tl-label">${s.label}</span>
            </div>`;
        }).join('')}
      </div>
      <button class="btn btn-primary tl-submit-btn" onclick="tlSubmit()">${d.submit}</button>
    </div>`;

  setVoiceText(d.intro);
}

// ── Drag & Drop ──────────────────────────────────────────────
let _tlDragId = null;

function tlDragStart(e) {
  _tlDragId = +e.currentTarget.dataset.id;
  e.currentTarget.classList.add('dragging');
}

function tlDragOver(e) {
  e.preventDefault();
  const target = e.currentTarget;
  target.classList.add('drag-over');
}

function tlDrop(e) {
  e.preventDefault();
  const targetId = +e.currentTarget.dataset.id;
  document.querySelectorAll('.tl-card').forEach(c => c.classList.remove('drag-over','dragging'));
  if (_tlDragId === targetId) return;
  const fromIdx = _tlOrder.indexOf(_tlDragId);
  const toIdx   = _tlOrder.indexOf(targetId);
  _tlOrder.splice(fromIdx, 1);
  _tlOrder.splice(toIdx, 0, _tlDragId);
  _renderTimeline();
}

// ── Touch drag (mobile) ──────────────────────────────────────
let _tlTouchCard = null, _tlTouchStartY = 0;

function tlTouchStart(e) {
  _tlTouchCard = e.currentTarget;
  _tlTouchStartY = e.touches[0].clientY;
  _tlTouchCard.classList.add('dragging');
}

function tlTouchMove(e) {
  e.preventDefault();
  const dy = e.touches[0].clientY - _tlTouchStartY;
  _tlTouchCard.style.transform = `translateY(${dy}px)`;
}

function tlTouchEnd(e) {
  if (!_tlTouchCard) return;
  _tlTouchCard.style.transform = '';
  _tlTouchCard.classList.remove('dragging');
  const touch = e.changedTouches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  const targetCard = el ? el.closest('.tl-card') : null;
  if (targetCard && targetCard !== _tlTouchCard) {
    const fromId = +_tlTouchCard.dataset.id;
    const toId   = +targetCard.dataset.id;
    const fi = _tlOrder.indexOf(fromId);
    const ti = _tlOrder.indexOf(toId);
    _tlOrder.splice(fi, 1);
    _tlOrder.splice(ti, 0, fromId);
    _renderTimeline();
  }
  _tlTouchCard = null;
}

// ── Submit ───────────────────────────────────────────────────
function tlSubmit() {
  const lang = AppState.lang || 'mr';
  const d = GAME_TIMELINE_DATA[lang] || GAME_TIMELINE_DATA['mr'];
  const correctOrder = d.stages.map(s => s.id); // already sorted by order
  const stageMap = {};
  d.stages.forEach(s => stageMap[s.id] = s);

  let allCorrect = true;
  _tlOrder.forEach((id, pos) => {
    const card = document.getElementById('tl-card-' + id);
    const isRight = correctOrder[pos] === id;
    if (!isRight) allCorrect = false;
    card.classList.add(isRight ? 'tl-correct' : 'tl-wrong');
    card.innerHTML += `<span class="tl-exp-inline">${stageMap[id].exp}</span>`;
  });

  const submitBtn = document.querySelector('.tl-submit-btn');
  if (submitBtn) submitBtn.style.display = 'none';

  const screen = document.querySelector('.game-tl-screen');
  if (allCorrect) {
    screen.insertAdjacentHTML('beforeend', `
      <div class="tl-perfect">${d.perfect}</div>
      <button class="btn btn-primary" style="margin:16px auto;display:block" onclick="navigate('home')">← Home</button>`);
    AppState.markComplete('game_timeline');
  } else {
    screen.insertAdjacentHTML('beforeend', `
      <button class="btn btn-secondary" style="margin:16px auto;display:block" onclick="renderGameTimeline()">${d.restart}</button>`);
  }
  setVoiceText(allCorrect ? d.perfect : d.restart);
}
