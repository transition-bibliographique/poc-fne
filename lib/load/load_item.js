const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const replacePseudoProps = require('./replace_pseudo_props')
const createOrEnrichEntity = require('./create_or_enrich_entity')

module.exports = (item, wbProps) => {
  replacePseudoProps(item, wbProps)
  return createOrEnrichEntity(item)
}
