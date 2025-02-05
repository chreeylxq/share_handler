const fs = require('fs');
const content = fs.readFileSync('./secrets.md', 'utf-8');
process.env.NPM_TOKEN = content;//存到环境中