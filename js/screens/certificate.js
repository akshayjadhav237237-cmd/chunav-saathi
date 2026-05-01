// CHUNAV SAATHI — certificate.js
function renderCertificate() {
  const el = document.getElementById('screen-certificate');
  const lang = AppState.lang || 'mr';

  el.innerHTML = `
    <div class="section-header cert-intro">
      <div class="section-title">${t('cert_title')}</div>
      <div class="section-subtitle">${lang === 'en' ? 'Complete all sections to earn your certificate' : lang === 'hi' ? 'सभी खंड पूरे करें और प्रमाणपत्र पाएं' : 'सर्व भाग पूर्ण करा आणि प्रमाणपत्र मिळवा'}</div>
    </div>
    <div style="padding:0 var(--space-lg) var(--space-md)">
      <div class="cert-name-form">
        <label class="cert-input-label">${t('cert_name_label')}</label>
        <input class="cert-input" id="cert-name-input" type="text"
          placeholder="${t('cert_name_placeholder')}"
          value=""
          maxlength="60"
          oninput="AppState.userName=this.value;localStorage.setItem('cs_name',this.value)">
        <button class="btn btn-primary" onclick="generateCertificate()">${t('cert_generate')}</button>
      </div>
    </div>

    <div class="cert-card" id="cert-card">
      <div class="cert-logo">🗳️</div>
      <div class="cert-org">${t('cert_org')}</div>
      <div class="cert-heading">${t('cert_heading')}</div>
      <div class="cert-to">${t('cert_to')}</div>
      <div class="cert-name" id="cert-display-name">—</div>
      <div class="cert-body">${t('cert_body')}</div>
      <div class="cert-seal">${t('cert_seal')}</div>
      <div class="cert-tricolor"><span></span><span></span><span></span></div>
      <div class="cert-footer" style="margin-top:var(--space-md)">${t('cert_footer')}</div>
    </div>

    <div class="cert-share-btns" id="cert-share-btns" style="display:none">
      <button class="btn btn-primary" onclick="shareCertificate()">${t('cert_share')}</button>
      <button class="btn btn-ghost" onclick="newCertificate()">${t('cert_new')}</button>
    </div>`;

  setVoiceText(t('cert_title'));
}

function generateCertificate() {
  const nameInput = document.getElementById('cert-name-input');
  const name = (nameInput && nameInput.value.trim()) || AppState.userName.trim();
  if (!name) {
    showToast(AppState.lang === 'en' ? 'Please enter your name.' : AppState.lang === 'hi' ? 'कृपया अपना नाम लिखें।' : 'कृपया तुमचे नाव लिहा.');
    return;
  }

  AppState.userName = name;
  localStorage.setItem('cs_name', name);

  const card = document.getElementById('cert-card');
  const displayName = document.getElementById('cert-display-name');
  const shareBtns = document.getElementById('cert-share-btns');

  if (displayName) displayName.textContent = name;
  if (card) card.classList.add('show');
  if (shareBtns) shareBtns.style.display = 'flex';

  AppState.markComplete('certificate');

  // Scroll to certificate
  setTimeout(() => {
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);

  // Confetti
  launchConfetti();
}

function newCertificate() {
  const card = document.getElementById('cert-card');
  const shareBtns = document.getElementById('cert-share-btns');
  if (card) card.classList.remove('show');
  if (shareBtns) shareBtns.style.display = 'none';
  const input = document.getElementById('cert-name-input');
  if (input) { input.value = ''; input.focus(); }
}

function shareCertificate() {
  const lang = AppState.lang || 'mr';
  const msg = lang === 'en'
    ? `🗳️ I am now an aware voter! I completed the Chunav Saathi voter education programme.\n\n#ChunavaaSaathi #JagrukMatdar #IndiaVotes`
    : lang === 'hi'
    ? `🗳️ मैं अब एक जागरूक मतदाता हूं! मैंने चुनाव साथी कार्यक्रम पूरा किया।\n\n#ChunavaaSaathi #JagrukMatdar #IndiaVotes`
    : `🗳️ मी आता एक जागरूक मतदार आहे! मी चुनाव साथी कार्यक्रम पूर्ण केला.\n\n#ChunavaaSaathi #JagrukMatdar #IndiaVotes`;

  if (navigator.share) {
    navigator.share({ title: t('cert_heading'), text: msg }).catch(() => {});
  } else {
    navigator.clipboard && navigator.clipboard.writeText(msg).then(() => {
      showToast(lang === 'en' ? 'Copied to clipboard!' : lang === 'hi' ? 'कॉपी हो गया!' : 'कॉपी झाले!');
    }).catch(() => showToast('Share: ' + msg.slice(0, 60)));
  }
}

function launchConfetti() {
  const colors = ['#FF9933', '#138808', '#004B87', '#FFD700', '#FF6B6B'];
  for (let i = 0; i < 28; i++) {
    const c = document.createElement('div');
    c.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}vw;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'2px'};z-index:9999;pointer-events:none;animation:confettiFall ${1.5+Math.random()*2}s ease forwards ${Math.random()*0.8}s`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}
