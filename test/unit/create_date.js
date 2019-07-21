require('should')
const createDate = require('../lib/transform/create_date')

describe('create_date', () => {
  describe('when simple subfield date value is passed', () => {
    it('should return date string compatible with loader', done => {
      const subfield = {
        code: 'd',
        '$t': '2010-10-18'
      }
      const date = createDate(subfield)
      date.should.be.an.String()
      date.should.equal('2010-10-18')
      done()
    })

    it('should return a years range string', done => {
      const subfield = {
        code: 'd',
        '$t': '1921-1976'
      }
      const date = createDate(subfield)
      date.should.be.an.String()
      date.should.equal('1921-1976')
      done()
    })
  })
  describe('when position based subfield is passed', () => {
    it('should return date string compatible with loader', done => {
      const subfield = {
        code: 'd',
        Pos: [
          { Code: '0003', '$t': '2013' },
          { Code: '0407', '$t': '0802' }
        ]
      }
      const date = createDate(subfield)
      date.should.be.an.String()
      date.should.equal('2013-08-02')
      done()
    })
  })
})
