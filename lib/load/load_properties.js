const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const wbSdk = require('wikibase-sdk')({ instance: config.instance })
const { get } = require('../request')

module.exports = (pseudoProperties) => {
  return Promise.all(load(pseudoProperties))
    .then(() => pseudoProperties)
}

const load = (properties) => {
  return Object.values(properties).map((prop) => {
    const { en: propEnLabel } = prop.labels
    const url = wbSdk.searchEntities({ search: propEnLabel, type: 'property' })
    return get(url).then(reuseOrCreate(prop, propEnLabel))
  })
}

const reuseOrCreate = (prop, propEnLabel) => (res) => {
  const firstWbResult = res.search[0]
  if (firstWbResult && firstWbResult.label === propEnLabel) {
    prop.id = firstWbResult.id
  } else {
    return wbEdit.entity.create(config, prop)
      .then((response) => { prop.id = response.entity.id })
  }
}
