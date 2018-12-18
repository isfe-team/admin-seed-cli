const chalk = require('chalk')

exports.error = error
exports.debug = debug

function error (message = '') {
  console.error(chalk.red(message))
}

function debug (message = '') {
  console.log(chalk.green(message))
}
