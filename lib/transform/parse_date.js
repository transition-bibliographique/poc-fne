module.exports = (value) => {
  const date = value.$t || value
  const datePrecision = findPrecision(date)

  if (date.trim() === '....') return
  else if (datePrecision) return preciseDate(date, datePrecision)
  else if (date.match(/^\d{4}\s{4}\?$/)) return year(date)
  else if (date.match(/^\d{8}$/)) return yearMonthDay(date)
  else return date.trim()
}

const preciseDate = (date, datePrecision) => {
  const timeValue = date.replace(/\./g, "0")
  return {
    time: timeValue.slice(0, 4),
    precision: datePrecision
  }
}

const year = (date) => date.slice(0, 4)

const yearMonthDay = (date) => {
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)

  return `${year}-${month}-${day}`
}

const findPrecision = (value) => {
  // Match every frist group of dots until '-' separator
  // does not include un precise days or months
  const valueWithDots = value.match(/\.+/)
  if (valueWithDots) {
    const dotLength = valueWithDots[0].length
    return toPrecision[dotLength]
  }
}

const toPrecision = {
  1: 8,
  2: 7,
  3: 6,
}
