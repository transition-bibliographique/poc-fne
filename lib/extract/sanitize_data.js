module.exports = data => {
  // force aray on subfield value
  // rename key subfield into subfields
  data.datafield = parseFields(data)
  return data
}

const parseFields = notice => notice.datafield.map(parseSubfields)

const parseSubfields = field => {
  const { subfield: subfields } = field
  delete field.subfield
  field.subfields = forceArray(subfields)
  return field
}

const forceArray = obj => obj instanceof Array ? obj : [ obj ]
