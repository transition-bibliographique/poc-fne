module.exports = (subfields) => {
  return subfields
    .reduce(aggregateSourceString, '')
    .trim()
}

const aggregateSourceString = (sourceStr, subfield) => {
  return `${sourceStr} $${subfield.code} ${subfield.$t}`
}
