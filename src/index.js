const { argv } = require('yargs')
const { resolve } = require('path')
const program = require('./program')

const defaultCoveragePath = 'coverage/coverage-summary.json'
const defaultConfigPath = 'jest-config.json'
const currentWorkingDir = process.cwd()

const coveragePath = resolve(
  currentWorkingDir,
  argv.coverageSummaryPath || defaultCoveragePath
)

const configPath = resolve(
  currentWorkingDir,
  argv.configPath || defaultConfigPath
)

program(coveragePath, configPath)
