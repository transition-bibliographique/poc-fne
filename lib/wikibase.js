const config = require('./config')
const wbSdk = require('wikibase-sdk')({ instance: config.instance })
const { get } = require('./request')

const getEntities = (ids) => {
  if (ids.length === 0) return Promise.resolve({})
  const url = wbSdk.getEntities({ ids })
  return get(url).then((res) => res.entities)
}

module.exports = {
  getEntity: (id) => getEntities(id).then(entities => entities[id]),
  getEntities,
  search: (params) => get(wbSdk.searchEntities(params))
}
