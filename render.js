const nunjucks = require('nunjucks');
const fs = require('fs');

nunjucks.configure('src', { autoescape: true });
rendered = nunjucks.render('index.njk');
fs.writeFileSync('html/index.html', rendered);
