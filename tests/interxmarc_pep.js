require('should')
const robertFlemingNotice = require('./fixtures/RobertFleming_BnF_14797579.json')
const parse = require('../lib/transform/parse')

describe('parser', () => {
  it('should return a list of used interxmarc properties', done => {
    const propertiesList = parse(robertFlemingNotice)
    propertiesList.should.be.an.Array()
    propertiesList.includes('031 a').should.be.true()
    done()
  })
})
