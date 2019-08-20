module.exports = data => {
  delete data['xmlns:mxc']

  data.leader = data['mxc:leader']
  delete data['mxc:leader']

  data.controlfield = data['mxc:controlfield']
  delete data['mxc:controlfield']

  data.datafield = sanitizeFields(data)
  delete data['mxc:datafield']

  return data
}

const sanitizeFields = notice => notice['mxc:datafield'].map(sanitizeSubfields)

const sanitizeSubfields = field => {
  const subfields = field['mxc:subfield']
  delete field['mxc:subfield']
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
