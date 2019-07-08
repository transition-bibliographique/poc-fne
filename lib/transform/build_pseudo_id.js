module.exports = (schema, subfield, index, tag) => {
  return `${schema}:${tag}:${subfield.code}:${index}`
}

const addClaim = (claims, property, value) => {
  claims[property] = value
}
