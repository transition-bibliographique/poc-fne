module.exports = (typeField) => {
  const { subfields } = typeField
  return getSubfields(subfields).join('.')
}

const getSubfields = (subfields) => {
  return subfields.map((subfield) => {
    return subfield.$t
  })
}
