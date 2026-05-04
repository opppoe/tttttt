const fs = require('fs');
const apiKeys = JSON.parse(fs.readFileSync('/Volumes/D/YouTube/js/api.js', 'utf8').match(/const apiKeys = \['(.*?)'\]/)?.[1] || '[]');
console.log(apiKeys);
