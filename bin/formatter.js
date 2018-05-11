const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const beautifyHtml = require('js-beautify').html;
const beautifyCss = require('js-beautify').css;
const shell = require('shelljs');

shell.cd(path.join(__dirname, '../dist/'));
shell
  .ls('*.html')
  .map(filePath => path.join(__dirname, `../dist/${filePath}`))
  .forEach((realPath) => {
    const data = beautifyHtml(shell.cat(realPath).stdout, { indent_size: 2 });
    fs.unlinkSync(realPath);
    fs.writeFile(realPath, data, 'utf8', () => {
      console.log(chalk.green(`Formatted: ${realPath}`));
    });
  });

shell
  .ls('*.css')
  .map(filePath => path.join(__dirname, `../dist/${filePath}`))
  .forEach((realPath) => {
    const data = beautifyCss(shell.cat(realPath).stdout, { indent_size: 2 });
    fs.unlinkSync(realPath);
    fs.writeFile(realPath, data, 'utf8', () => {
      console.log(chalk.green(`Formatted: ${realPath}`));
    });
  });
