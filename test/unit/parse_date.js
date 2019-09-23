require('should')
const parseDate = require('../../lib/transform/parse_date')

describe('parse_date', () => {
  describe('when simple subfield date value is passed', () => {
    it('should return date string compatible with loader', done => {
      const subfield = {
        code: 'd',
        '$t': '2010-10-18'
      }
      const date = parseDate(subfield)
      date.should.be.an.String()
      date.should.equal('2010-10-18')
      done()
    })

    it('should return a years range string', done => {
      const subfield = {
        code: 'd',
        '$t': '1921-1976'
      }
      const date = parseDate(subfield)
      date.should.be.an.String()
      date.should.equal('1921-1976')
      done()
    })
  })
  it('should return date with century precision', done => {
    const subfield = {
      "code": "d",
      "$t": "19..-...."
    }
    const value = parseDate(subfield)
    value.should.be.an.Object()
    value.time.should.equal('1900')
    done()
  })
})
