const config = require('../config')
const loadItem = require('./load_item')
const loadRelation = require('./load_relation')
const loadSequentially = require('./load_sequentially')
const wbSdk = require('wikibase-sdk')({ instance: config.instance })
const { get } = require('../request')
const { keyBy } = require('lodash')

module.exports = (items, relations, wbProps) => {
  return loadSequentially(loadItem, items, wbProps)
  .then((createdItems) => {
    const itemsByPseudoIds = getItemsByPseudoIds(createdItems)
    return loadSequentially(loadRelation, relations, itemsByPseudoIds, wbProps)
    .then(relationsRes =>  {
      const ids = createdItems.map((item) => item.id)
      return getEntities(ids)
      .then(attachRelations(relationsRes))
    })
  })
}

const getEntities = (ids) => {
  const url = wbSdk.getEntities({ ids })
  return get(url)
}

const attachRelations = (relationsRes) => (res) => {
  res.relations = relationsRes
  return res
}

const getItemsByPseudoIds = (items) => keyBy(items, (item) => item.labels.en)
