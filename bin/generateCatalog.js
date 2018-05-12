const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');
const beautifyHtml = require('js-beautify').html;

shell.cd(path.join(__dirname, '../src/pages/'));

/* eslint-disable */
const htmlString = [
  '<html>',
    '<body>',
      '<ul>',
        ...shell
          .ls('*.pug')
          .map((file) => {
            const name = file.split('.')[0];
            return `<li><a href="${name}.html">${name}.html</a></li>`;
          }),
      '</ul>',
    '</body>',
  '</html>',
].join('');
/* eslint-enable */

const optFile = path.resolve(__dirname, '../dist/index.html');
fs.writeFile(optFile, beautifyHtml(htmlString), 'utf8', () => {
  console.info(chalk.green(`Catalog generated: ${optFile}`));
});
