const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

const outputPath = 'docs/';

nunjucks.configure('src', { autoescape: true });

function render(templateName) {
    fs.writeFileSync(
        outputPath + templateName + '.html',
        nunjucks.render(templateName + '.njk')
    );
}

function renderProject(templateName) {
    dirname = path.dirname(templateName);
    fs.mkdirSync(outputPath + dirname, { recursive: true });
    fs.writeFileSync(
        outputPath + templateName + '.html',
        nunjucks.render(templateName + '.njk')
    );
}

render('index');
renderProject('projects/flight');
renderProject('projects/magnets');
renderProject('projects/market');
renderProject('projects/radio');
renderProject('projects/security');
renderProject('projects/sound');
renderProject('writing/queernuns');
renderProject('writing/guineaworm');
renderProject('writing/psychpsych');