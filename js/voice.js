// CHUNAV SAATHI — voice.js — Web Speech API TTS wrapper
const Voice = {
  synth: window.speechSynthesis,
  speaking: false,
  langMap: { mr: 'hi-IN', hi: 'hi-IN', en: 'en-IN' },

  speak(text, lang) {
    if (!this.synth) return;
    this.stop();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = this.langMap[lang] || 'hi-IN';
    const speedMap = { slow: 0.65, normal: 0.88, fast: 1.3 };
    const savedSpeed = localStorage.getItem('cs_voice_speed') || 'normal';
    utt.rate = speedMap[savedSpeed] || 0.88;
    utt.pitch = 1;
    utt.volume = 1;
    utt.onstart = () => { this.speaking = true; this._updateUI(true); };
    utt.onend = () => { this.speaking = false; this._updateUI(false); };
    utt.onerror = () => { this.speaking = false; this._updateUI(false); };
    this.synth.speak(utt);
  },

  stop() {
    if (this.synth) { this.synth.cancel(); }
    this.speaking = false;
    this._updateUI(false);
  },

  toggle(text, lang) {
    if (this.speaking) { this.stop(); } else { this.speak(text, lang); }
  },

  _updateUI(active) {
    document.querySelectorAll('.top-bar-voice, .voice-fab').forEach(el => {
      el.classList.toggle('speaking', active);
      el.textContent = active ? '🔇' : '🔊';
    });
  },

  isSupported() { return !!window.speechSynthesis; }
};
