const defaultConfig = require('../config/default')
var localConfig
try {
  localConfig = require('../config/local')
} catch (err) {
  localConfig = {}
}

module.exports = Object.assign({}, defaultConfig, localConfig)
