const config = require('../config')
const wbEdit = require('wikibase-edit')(config)

module.exports = (item, wbProps) => {
  replacePseudoProps(item, wbProps)
  return Promise.resolve(load(item, wbProps))
    .then(() => item)
}

const load = (item) => {
  return wbEdit.entity.create(config, item)
    .then((response) => { item.id = response.entity.id })
}

const replacePseudoProps = (item, wbProps) => {
  const { claims } = item
  if (!claims) return
  return Object.keys(claims).forEach((pseudoClaim) => {
    const wbClaim = wbProps[pseudoClaim].id
    claims[wbClaim] = claims[pseudoClaim]
    delete claims[pseudoClaim]
  })
}
