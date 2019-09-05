module.exports = (item, wbProps) => {
  replaceSnaksPseudoProps(wbProps, item.claims)
}

const replaceSnaksPseudoProps = (wbProps, snaks) => {
  if (!snaks) return
  Object.keys(snaks).forEach((pseudoPropertyId) => {
    const propertyId = wbProps[pseudoPropertyId].id
    const propertySnaks = snaks[pseudoPropertyId]
    snaks[propertyId] = propertySnaks
    delete snaks[pseudoPropertyId]

    propertySnaks.forEach(snak => {
      if (snak.qualifiers) replaceSnaksPseudoProps(wbProps, snak.qualifiers)
      if (snak.references) {
        snak.references.forEach(replaceSnaksPseudoProps.bind(null, wbProps))
      }
    })
  })
}
