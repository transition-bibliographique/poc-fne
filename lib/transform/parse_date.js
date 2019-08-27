const _ = require('lodash')

module.exports = (subfield) => {
  date = subfield.$t
  if (!date.includes('-')) { return yearMonthDay(date) }
  return date
}

const yearMonthDay = (date) => {
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)

  return `${year}-${month}-${day}`
}
