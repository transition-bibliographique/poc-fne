module.exports = data => {
  // force aray on subfield value
  // rename key subfield into subfields
  data.datafield = sanitizeFields(data)
  return data
}

const sanitizeFields = notice => notice.datafield.map(sanitizeSubfields)

const sanitizeSubfields = field => {
  const { subfield: subfields } = field
  delete field.subfield
  field.subfields = forceArray(subfields)
  forceArrayPosField(field)
  field.subfields.forEach(forceArrayPosField)
  return field
}

const forceArray = obj => obj instanceof Array ? obj : [ obj ]

const forceArrayPosField = field => {
  if (field.Pos) {
    field.Pos = forceArray(field.Pos)
  }
}
