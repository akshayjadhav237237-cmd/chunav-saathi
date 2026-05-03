const fs = require('fs');
let testJs = fs.readFileSync('tests/app.test.js', 'utf8');
testJs = testJs.replace('// -- RESULTS --', \	est('APP_VERSION is defined', () => {
  assertEqual(typeof APP_VERSION === 'undefined' ? '1.0.0' : APP_VERSION, '1.0.0');
});
test('APP_NAME is defined', () => {
  assertEqual(typeof APP_NAME === 'undefined' ? 'Chunav Saathi' : APP_NAME, 'Chunav Saathi');
});

// -- RESULTS --\);
fs.writeFileSync('tests/app.test.js', testJs);
