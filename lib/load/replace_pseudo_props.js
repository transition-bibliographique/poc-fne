const { forceArray } = require('../utils')

module.exports = (item, wbProps) => {
  replaceSnaksPseudoProps(wbProps, item.claims)
}

const replaceSnaksPseudoProps = (wbProps, snaks) => {
  if (!snaks) return
  Object.keys(snaks).forEach((pseudoPropertyId) => {
    if (!wbProps[pseudoPropertyId]) return
    const propertyId = wbProps[pseudoPropertyId].id
    const propertySnaks = forceArray(snaks[pseudoPropertyId])
    snaks[propertyId] = propertySnaks
    delete snaks[pseudoPropertyId]

    propertySnaks.forEach(snak => {
      if (snak.qualifiers) replaceSnaksPseudoProps(wbProps, snak.qualifiers)
      if (snak.references) {
        snak.references = forceArray(snak.references)
        snak.references.forEach(replaceSnaksPseudoProps.bind(null, wbProps))
      }
    })
  })
}
