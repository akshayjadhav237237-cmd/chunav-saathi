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
    utt.rate = 0.88;
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
