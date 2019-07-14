const config = require('../../config/local')
const wbEdit = require('wikibase-edit')(config)

module.exports = (item, wbProps) => {
  replacePseudoProps(item, wbProps)
  return Promise.resolve(load(item, wbProps))
    .then(() => item)
}

const load = (item, wbProps) => {
  return wbEdit.entity.create(config, item)
    .then((response) => { item.id = response.entity.id })
}

const replacePseudoProps = (item, wbProps) => {
  const { claims } = item
  return Object.keys(claims).forEach((pseudoClaim) => {
    const wbClaim = wbProps[pseudoClaim].id
    claims[wbClaim] = claims[pseudoClaim]
    delete claims[pseudoClaim]
  })
}
