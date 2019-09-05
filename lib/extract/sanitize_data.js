module.exports = notice => {
  delete notice['xmlns:mxc']

  notice.datafield = notice.datafield.map(sanitizeSubfields)

  return notice
}

const sanitizeSubfields = field => {
  const subfields = field.subfield
  field.subfields = forceArray(subfields)
  delete field.subfield
  return field
}

const forceArray = obj => obj instanceof Array ? obj : [ obj ]
