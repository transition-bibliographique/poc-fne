const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const replacePseudoEntities = require('./replace_pseudo_entities')
const createOrEnrichEntity = require('./create_or_enrich_entity')

module.exports = (item, contextEntities) => {
  replacePseudoEntities(item, contextEntities)
  return createOrEnrichEntity(item)
}
