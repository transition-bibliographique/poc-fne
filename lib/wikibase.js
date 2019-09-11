const config = require('./config')
const wbSdk = require('wikibase-sdk')({ instance: config.instance })
const { get } = require('./request')
const { forceArray } = require('./utils')

const getEntities = (ids) => {
  ids = forceArray(ids)
  if (ids.length === 0) return Promise.resolve({})
  const urls = wbSdk.getManyEntities({ ids })

  const allEntities = {}

  const getEntitiesSequentially = () => {
    const url = urls.shift()
    if (!url) return allEntities

    return get(url)
    .then(({ entities }) => Object.assign(allEntities, entities))
    .then(getEntitiesSequentially)
  }

  return getEntitiesSequentially()
}

module.exports = {
  getEntity: (id) => getEntities(id).then(entities => entities[id]),
  getEntities,
  search: (params) => get(wbSdk.searchEntities(params))
}
