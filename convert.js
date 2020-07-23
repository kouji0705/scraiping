var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./giants_pitcherbk.json', 'utf8'));
console.log(obj);
