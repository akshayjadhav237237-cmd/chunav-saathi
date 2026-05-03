// CHUNAV SAATHI — quiz.js
let _qState = { idx: 0, score: 0, answered: false, started: false };

/**
 * Renders the Quiz screen
 * @returns {void}
 */
function renderQuiz() {
  _qState = { idx: 0, score: 0, answered: false, started: false };
  const el = document.getElementById('screen-quiz');
  const lang = AppState.lang || 'mr';

  el.innerHTML = `
    <div class="quiz-header">
      <div class="section-title" style="color:white">${t('quiz_title')}</div>
      <div style="color:rgba(255,255,255,0.75);font-size:var(--font-size-sm);margin-top:4px">${QUIZ_DATA[lang].length} ${lang === 'en' ? 'questions' : lang === 'hi' ? 'सवाल' : 'प्रश्न'}</div>
    </div>
    <div style="padding:var(--space-lg)">
      <div class="quiz-card" style="text-align:center;padding:var(--space-xl)">
        <div style="font-size:64px;margin-bottom:var(--space-md)">🧠</div>
        <div style="font-size:var(--font-size-body-lg);font-weight:var(--font-weight-bold);color:var(--text-primary);margin-bottom:var(--space-sm)">${t('quiz_title')}</div>
        <div style="font-size:var(--font-size-sm);color:var(--text-muted);margin-bottom:var(--space-xl);line-height:var(--line-height)">${QUIZ_DATA[lang].length} ${lang === 'en' ? 'multiple choice questions about voting in India' : lang === 'hi' ? 'बहुविकल्पीय सवाल' : 'बहुपर्यायी प्रश्न'}</div>
        <button class="btn btn-primary" onclick="startQuiz()">${t('quiz_start')}</button>
      </div>
    </div>`;
  setVoiceText(t('quiz_title'));
}

/**
 * Starts the quiz
 * @returns {void}
 */
function startQuiz() {
  _qState = { idx: 0, score: 0, answered: false, started: true };
  renderQuestion();
}

/**
 * Renders the current question
 * @returns {void}
 */
function renderQuestion() {
  const lang = AppState.lang || 'mr';
  const questions = QUIZ_DATA[lang];
  const el = document.getElementById('screen-quiz');
  if (_qState.idx >= questions.length) { renderQuizReport(); return; }

  const q = questions[_qState.idx];
  const num = _qState.idx + 1;
  const total = questions.length;
  const pct = Math.round((num / total) * 100);

  el.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-meta">
        <span class="quiz-q-num">${lang === 'en' ? 'Question' : lang === 'hi' ? 'सवाल' : 'प्रश्न'} ${num}/${total}</span>
        <span class="quiz-score-display">✅ ${_qState.score}</span>
      </div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%;background:rgba(255,255,255,0.5)"></div></div>
    </div>
    <div class="quiz-card">
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options" role="radiogroup">
        ${q.opts.map((o, i) => `
          <button class="quiz-option-btn" id="qopt-${i}" onclick="answerQuiz(${i})" role="radio" aria-checked="false">
            <span class="quiz-option-key">${['A','B','C','D'][i]}</span>
            <span>${o}</span>
          </button>`).join('')}
      </div>
    </div>`;
  setVoiceText(q.q + '. ' + q.opts.join('. '));
}

/**
 * Evaluates the chosen answer
 * @param {number} chosen - The index of the chosen option
 * @returns {void}
 */
function answerQuiz(chosen) {
  if (_qState.answered) return;
  _qState.answered = true;

  const lang = AppState.lang || 'mr';
  const q = QUIZ_DATA[lang][_qState.idx];
  const isCorrect = chosen === q.ans;
  if (isCorrect) {
    _qState.score++;
    if(typeof gtag !== 'undefined') {
      gtag('event', 'quiz_answer', {
        correct: true
      });
    }
  }

  // Color buttons
  q.opts.forEach((_, i) => {
    const btn = document.getElementById('qopt-' + i);
    if (!btn) return;
    btn.disabled = true;
    if (i === chosen) btn.setAttribute('aria-checked', 'true');
    if (i === q.ans) btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('incorrect');
  });

  // Show feedback
  const fb = document.createElement('div');
  fb.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
  fb.innerHTML = `
    <div class="quiz-feedback-title">${isCorrect ? t('quiz_correct') : t('quiz_incorrect')}</div>
    <div class="quiz-feedback-exp">${q.exp}</div>
    <div style="margin-top:var(--space-md)">
      <button class="btn ${_qState.idx < QUIZ_DATA[lang].length - 1 ? 'btn-secondary' : 'btn-primary'}" onclick="nextQuestion()">
        ${_qState.idx < QUIZ_DATA[lang].length - 1 ? t('quiz_next') : t('quiz_finish')}
      </button>
    </div>`;

  const card = document.querySelector('.quiz-card');
  if (card) card.after(fb);

  document.getElementById('screen-container').scrollTo({ top: document.getElementById('screen-container').scrollHeight, behavior: 'smooth' });
}

/**
 * Advances to the next question
 * @returns {void}
 */
function nextQuestion() {
  _qState.idx++;
  _qState.answered = false;
  renderQuestion();
  document.getElementById('screen-container').scrollTop = 0;
}

/**
 * Renders the final quiz report
 * @returns {void}
 */
function renderQuizReport() {
  const lang = AppState.lang || 'mr';
  const total = QUIZ_DATA[lang].length;
  const pct = Math.round((_qState.score / total) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚';
  const el = document.getElementById('screen-quiz');

  el.innerHTML = `
    <div class="quiz-header">
      <div class="section-title" style="color:white">${lang === 'en' ? 'Quiz Complete!' : lang === 'hi' ? 'क्विज़ पूरा!' : 'क्विझ पूर्ण!'}</div>
    </div>
    <div class="quiz-report">
      <div style="font-size:64px;margin-bottom:var(--space-md)">${emoji}</div>
      <div class="quiz-report-score">${_qState.score}</div>
      <div class="quiz-report-pct">${t('quiz_out_of')} ${total}</div>
      <div class="quiz-report-label">${pct}% — ${pct >= 80 ? (lang === 'en' ? 'Excellent!' : lang === 'hi' ? 'शानदार!' : 'उत्कृष्ट!') : pct >= 50 ? (lang === 'en' ? 'Good job!' : lang === 'hi' ? 'अच्छा!' : 'चांगले!') : (lang === 'en' ? 'Keep learning!' : lang === 'hi' ? 'और पढ़ें!' : 'अजून शिका!')}</div>
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <div class="quiz-actions">
        <button class="btn btn-primary" onclick="startQuiz()">${t('quiz_restart')}</button>
        <button class="btn btn-secondary" onclick="navigate('certificate')">${t('nav_cert')} 🏆</button>
      </div>
    </div>`;

  AppState.markComplete('quiz');
  if (typeof gtag !== 'undefined') {
    gtag('event', 'quiz_complete', {
      score: _qState.score,
      total: total,
      language: AppState.lang
    });
  }
  setVoiceText(`${t('quiz_score_label')}: ${_qState.score} ${t('quiz_out_of')} ${total}`);
}
