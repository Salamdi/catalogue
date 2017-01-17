const pug = require('pug');
const fs = require('fs');

const compileIndex = pug.compileFile('./app/temp/template.pug');

const indexHTML = compileIndex();
fs.writeFile('./docs/index.html', indexHTML, (err) => {
	if (err) throw err;
	console.log('index.html has been compiled');
});