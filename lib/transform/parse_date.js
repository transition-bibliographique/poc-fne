module.exports = (value) => {
  const date = value.$t || value
  if (date.match(/^\d{8}$/)) return yearMonthDay(date)
  else return date.trim()
}

const yearMonthDay = (date) => {
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)

  return `${year}-${month}-${day}`
}
