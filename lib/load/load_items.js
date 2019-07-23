const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const loadItem = require('./load_item')
const loadRelation = require('./load_relation')
const loadSequentially = require('./load_sequentially')
const wbSdk = require('wikibase-sdk')({ instance: config.instance })
const { get } = require('../request')

module.exports = (items, relations, wbProps) => {
  return loadSequentially(loadItem, items, wbProps)
  .then((createdItems) => {
    return loadSequentially(loadRelation, relations, createdItems, wbProps)
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
