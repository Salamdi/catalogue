const pug = require('pug');
const fs = require('fs');

const compileIndex = pug.compileFile('./app/temp/template.pug');
const compileLogin = pug.compileFile('./app/temp/login.pug');
const compileCatalogue = pug.compileFile('./app/temp/catalogue.pug');
const compileDetails = pug.compileFile('./app/temp/details.pug');


const indexHTML = compileIndex();
fs.writeFile('./dist/index.html', indexHTML, (err) => {
	if (err) throw err;
	console.log('index.html has been compiled');
});

const loginHTML = compileLogin();
fs.writeFile('./dist/login.html', loginHTML, (err) => {
	if (err) throw err;
	console.log('login.html has been compiled');
});

const catalogueHTML = compileCatalogue();
fs.writeFile('./dist/catalogue.html', catalogueHTML, (err) => {
	if (err) throw err;
	console.log('catalogue.html has been compiled');
});

const detailsHTML = compileDetails();
fs.writeFile('./dist/details.html', detailsHTML, (err) => {
	if (err) throw err;
	console.log('details.html has been compiled');
});

console.log(new Date());