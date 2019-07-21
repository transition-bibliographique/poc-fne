module.exports = (notice) => {
  const { datafield: datafields, controlfield: controlfields, leader } = notice
  const typeKey = findTypeKey(leader)
  return typeNoticeParser[typeKey](notice)
}

const findTypeKey = (leader) => {
  return leader.Pos.find((pos) => pos.Code === '09').$t
}

const typeNoticeParser = {
  s: require('./parse_work_notice'),
  p: require('./parse_author_notice')
}
