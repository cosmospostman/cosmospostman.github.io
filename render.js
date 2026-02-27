const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');
const matter = require('gray-matter');

const outputPath = 'docs/';

const env = nunjucks.configure('src', { autoescape: true });
env.addGlobal('year', new Date().getFullYear());
env.addGlobal('projects', require('./src/_data/projects.json'));

const writingFiles = fs.readdirSync('src/writing').filter(f => f.endsWith('.md'));
const writingData = writingFiles
    .map(file => {
        const raw = fs.readFileSync('src/writing/' + file, 'utf8');
        const { data } = matter(raw);
        return {
            slug: path.basename(file, '.md'),
            title: data.title,
            url: '/writing/' + path.basename(file, '.md') + '.html',
            publication: data.publication || null,
            description: data.description,
            order: data.order,
        };
    })
    .sort((a, b) => a.order - b.order);
env.addGlobal('writing', writingData);

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

function renderWritingDir() {
    fs.mkdirSync(outputPath + 'writing', { recursive: true });
    const files = fs.readdirSync('src/writing').filter(f => f.endsWith('.md'));
    for (const file of files) {
        const stem = path.basename(file, '.md');
        const raw = fs.readFileSync('src/writing/' + file, 'utf8');
        const { data: frontmatter, content: body } = matter(raw);

        const config = {
            tags: {
                sup: {
                    render: 'sup',
                    children: ['inline'],
                },
                caps: {
                    render: 'p',
                    attributes: {
                        class: { type: String, default: 'text-caps' },
                    },
                    children: ['inline'],
                    block: true,
                },
            },
        };
        const ast = Markdoc.parse(body);
        const rendered = Markdoc.transform(ast, config);
        const htmlContent = Markdoc.renderers.html(rendered);

        fs.writeFileSync(
            outputPath + 'writing/' + stem + '.html',
            nunjucks.render('writing.njk', {
                title: frontmatter.title,
                publication: frontmatter.publication || null,
                images: frontmatter.images || [],
                content: htmlContent,
            })
        );
    }
}

render('index');
renderDir('projects');
renderWritingDir();
