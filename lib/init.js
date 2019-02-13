const fs = require('fs')
const path = require('path')
const ora = require('ora')
const rm = require('rimraf').sync
const download = require('download-git-repo')
const logger = require('./logger')

module.exports = init

function init (projectName, repo, projectRoot = process.cwd()) {
  if (!projectName) {
    logger.error('Project name should be specific.')
    return
  }

  const projectFullPath = path.join(projectRoot, projectName)

  const exist = fs.existsSync(projectFullPath)

  if (exist) {
    logger.error('File or directory exists.')
    return
  }

  const spinner = ora('downloading template')
  spinner.start()
  download(repo, projectFullPath, function (err) {
    spinner.stop()
    if (err) {
      logger.error(err.message)
      return
    }
    // remove legal release
    rm(path.join(projectFullPath, 'dist/*'))
    logger.debug('Local project has been generated. You can read the README.md to start your journey.')
  })
}
