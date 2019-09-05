module.exports = ({ record }) => {
  if (record['recorddata']) {
    // BNF intermarc
    return record['recorddata']['record']
  } else {
    // ABES marc
    return record
  }
}
