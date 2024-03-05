npm install
brew install sass/sass/sass
sass style.scss docs/css/style.css

## To render everything under docs/
node render.js

## Local development
npm install http-server -g
cd docs/
npx http-server -p 8000