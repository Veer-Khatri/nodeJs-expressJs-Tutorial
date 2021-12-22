import chalk from 'chalk'
import validator from 'validator' 
console.log(chalk.bgWhite.cyan.inverse.underline("hello"));
console.log(validator.isEmail("beer@veer.com"));