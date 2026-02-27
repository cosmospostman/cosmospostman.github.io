const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

const outputPath = 'docs/';

const env = nunjucks.configure('src', { autoescape: true });
env.addGlobal('year', new Date().getFullYear());
env.addGlobal('writing', require('./src/_data/writing.json'));
env.addGlobal('projects', require('./src/_data/projects.json'));

function render(templateName) {
    fs.writeFileSync(
        outputPath + templateName + '.html',
        nunjucks.render(templateName + '.njk')
    );
}

function renderDir(dirName) {
    fs.mkdirSync(outputPath + dirName, { recursive: true });
    const files = fs.readdirSync('src/' + dirName);
    for (const file of files) {
        if (!file.endsWith('.njk')) continue;
        const stem = path.basename(file, '.njk');
        fs.writeFileSync(
            outputPath + dirName + '/' + stem + '.html',
            nunjucks.render(dirName + '/' + file)
        );
    }
}

render('index');
renderDir('projects');
renderDir('writing');
