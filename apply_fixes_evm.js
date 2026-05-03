const fs = require('fs');

let evmJs = fs.readFileSync('js/screens/evm.js', 'utf8');

// 1. Add JSDoc to renderEvm
evmJs = evmJs.replace('function renderEvm() {', '/**\n * Renders the EVM Simulator screen\n * @returns {void}\n */\nfunction renderEvm() {');

// 2. Add JSDoc to _evmStartBlink
evmJs = evmJs.replace('function _evmStartBlink() {', '/**\n * Starts blinking the LCD on the EVM Control Unit\n * @returns {void}\n */\nfunction _evmStartBlink() {');

// 3. Add JSDoc to evmPress
evmJs = evmJs.replace('function evmPress(idx) {', '/**\n * Handles pressing a vote button on the EVM\n * @param {number} idx - Index of the candidate pressed\n * @returns {void}\n */\nfunction evmPress(idx) {');

// 4. Add GA to evmPress success
evmJs = evmJs.replace('AppState.markComplete(\'evm\');', 'AppState.markComplete(\'evm\');\n        if (typeof gtag !== \'undefined\') {\n          gtag(\'event\', \'evm_vote_cast\', { practice: true, language: AppState.lang });\n        }');

// 5. Add JSDoc to _evmBeep
evmJs = evmJs.replace('function _evmBeep() {', '/**\n * Beeps using Web Audio API\n * @returns {void}\n */\nfunction _evmBeep() {');

// 6. Add JSDoc to _evmShowSlip
evmJs = evmJs.replace('function _evmShowSlip(cand) {', '/**\n * Shows the VVPAT slip\n * @param {Object} cand - Candidate object\n * @returns {void}\n */\nfunction _evmShowSlip(cand) {');

// 7. Add JSDoc to evmReset
evmJs = evmJs.replace('function evmReset() {', '/**\n * Resets the EVM to its initial state\n * @returns {void}\n */\nfunction evmReset() {');

fs.writeFileSync('js/screens/evm.js', evmJs);

console.log('evm.js updated');
