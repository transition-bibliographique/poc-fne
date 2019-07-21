const config = require('../config')
const wbEdit = require('wikibase-edit')(config)
const loadItem = require('./load_item')
const loadRelation = require('./load_relation')
const wbSdk = require('wikibase-sdk')({ instance: config.instance })
const { get } = require('../request')

module.exports = (items, relations, wbProps) => {
  return Promise.all(items.map((item) => loadItem(item, wbProps)))
  .then((items) => {
    return Promise.all(relations.map((relation) => loadRelation(relation, items, wbProps)))
    .then(() =>  {
      const ids = items.map((item) => item.id)
      return getEntities(ids)
    })
  })
}

const getEntities = (ids) => {
  const url = wbSdk.getEntities({ ids })
  return get(url)
}
