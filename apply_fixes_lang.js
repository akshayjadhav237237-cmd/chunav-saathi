const fs = require('fs');

if (fs.existsSync('js/screens/language.js')) {
  let langJs = fs.readFileSync('js/screens/language.js', 'utf8');

  // Add JSDoc to renderLanguageScreen
  langJs = langJs.replace('function renderLanguageScreen() {', '/**\n * Renders the initial Language Selection screen\n * @returns {void}\n */\nfunction renderLanguageScreen() {');

  // Add JSDoc to selectLanguage
  langJs = langJs.replace('function selectLanguage(code) {', '/**\n * Handles language selection\n * @param {string} code - Language code\n * @returns {void}\n */\nfunction selectLanguage(code) {');

  fs.writeFileSync('js/screens/language.js', langJs);
  console.log('language.js updated');
} else {
  console.log('language.js not found');
}
