const sass = require('node-sass');
const fs = require('fs');

sass.render({
	file: './app/styles/style.scss'
}, (err, res) => {
	if (err) throw err;
	else fs.writeFile('./dist/style.css', res.css, (err) => {
		if (err) throw err;
		else console.log('style has been compiled');
	});
})