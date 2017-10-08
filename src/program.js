const R = require('ramda')
const F = require('fluture')

const {
  addLineBreak,
  formatJson,
  getCurrentThresholdsFromConfig,
  getNewThresholdsFromSummary,
  getJestConfigJson,
  getJestConfigJsonPath,
  logResult,
  ratchetThresholds,
  requireF,
  thresholdLens,
  writeFileF,
  logError,
  logSuccess,
} = require('./utils')

module.exports = (coverage, config) => {
  R.pipe(
    F.of,
    R.chain(([coveragePath, configPath]) =>
      F.both(
        requireF(coveragePath).map(getNewThresholdsFromSummary),
        requireF(configPath).map(getCurrentThresholdsFromConfig)
      )
    ),
    R.map(ratchetThresholds),
    R.map(logResult),
    R.chain(newThresholds =>
      getJestConfigJson(config).map(R.set(thresholdLens, newThresholds))
    ),
    R.map(formatJson),
    R.map(addLineBreak),
    R.chain(thresholds =>
      F.both(getJestConfigJsonPath(config), F.of(thresholds))
    ),
    R.chain(R.apply(writeFileF))
  )([coverage, config]).fork(logError, logSuccess)
}
