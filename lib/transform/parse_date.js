const { padEnd } = require('lodash')

module.exports = (value) => {
  var date = value.$t || value

  date = recoverInvalidDates(date)

  // If the date string is smaller than 4 characters, it is assumed that it's an ABES
  // date string with approximative precision, so we align it to the BNF dot syntax
  date = padEnd(date, 4, '.')
    // Ex: '00XX' => '00..'
    .replace(/X/g, '.')
    // Ex: '1953-' => '1953'
    .replace(/-$/, '')

  const datePrecision = findPrecision(date)

  if (date.trim() === '....') return
  else if (datePrecision) return preciseDate(date, datePrecision)
  else if (date.match(/^-?\d{4}\s{4}\?$/)) return year(date)
  else if (date.match(/^-?\d{8}$/)) return yearMonthDay(date)
  else return date.trim()
}

const preciseDate = (date, datePrecision) => {
  const timeValue = date.replace(/\./g, '0')
  return {
    time: timeValue.slice(0, 4),
    precision: datePrecision
  }
}

const year = (date) => {
  if (date[0] === '-') return date.slice(0, 5)
  else return date.slice(0, 4)
}

const yearMonthDay = (date) => {
  const sign = date[0] === '-' ? '-' : ''
  date = date.replace(/^-/, '')
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)

  return `${sign}${year}-${month}-${day}`
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
  3: 6
}

// Recover known invalid dates
// Ex: 19631963 => 1963
const recoverInvalidDates = (date) => {
  if (date.length !== 8) return date
  const year = date.substring(0, 4)
  const month = date.substring(4, 6)
  const day = date.substring(6, 8)
  if ((parseInt(month) > 12 || parseInt(day) > 31) && year === `${month}${day}`) {
    return year
  } else {
    return date
  }
}
