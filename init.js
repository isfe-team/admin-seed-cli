const fs = require('fs')
const path = require('path')
const ora = require('ora')
const chalk = require('chalk')
const rm = require('rimraf').sync
const download = require('download-git-repo')

module.exports = init

function init (projectName, projectRoot = process.cwd()) {
  if (!projectName) {
    error('Project name should be specific.')
    return
  }

  const projectFullPath = path.join(projectRoot, projectName)

  const exist = fs.existsSync(projectFullPath)

  if (exist) {
    error('File or directory exists.')
    return
  }

  const spinner = ora('downloading template')
  spinner.start()
  download('isfe-team/admin-seed', projectFullPath, function (err) {
    spinner.stop()
    if (err) {
      error(err.message)
      return
    }
    // remove legal release
    rm(path.join(projectFullPath, 'dist/*'))
    debug('Local project has been generated. You can read the README.md to start your journey.')
  })
}

function error (message = '') {
  console.error(chalk.red(message))
}

function debug (message = '') {
  console.log(chalk.green(message))
}
