const config = require('../../config/local')
const wbEdit = require('wikibase-edit')(config)

module.exports = (properties) => {
  return Promise.all(load(properties))
    .then(() => properties)
}

const load = (properties) => {
  return Object.values(properties).map((prop) => {
    return wbEdit.entity.create(config, prop)
      .then((response) => { prop.id = response.entity.id })
  })
}
