require('should')
const robertFlemingNotice = require('./fixtures/RobertFleming_BnF_14797579.json')
const parse = require('../lib/transform/parse_interxmarc')

describe('parser', () => {
  it('should return a list of used interxmarc properties', done => {
    const propertyId = 'interxmarc:031:a:0'
    const properties = parse(robertFlemingNotice)
    properties.should.be.an.Object()
    const propertiesList = Object.keys(properties)
    propertiesList.should.be.an.Array()
    propertiesList.includes(propertyId).should.be.true()
    properties[propertyId].id.should.equal(propertyId)
    properties[propertyId].aliases.fr.should.equal(propertyId)
    properties[propertyId].datatype.should.equal('string')
    done()
  })
})
