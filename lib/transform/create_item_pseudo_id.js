module.exports = (field100) => {
  const { subfields } = field100
  return getSubfields(subfields).join('.')
}

const getSubfields = (subfields) => {
  return subfields.map((subfield) => {
    return subfield.$t
  })
}
