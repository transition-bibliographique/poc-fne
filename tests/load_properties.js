require('should')
const robertFlemingNotice = require('./fixtures/RobertFleming_BnF_14797579.json')
const parseProperties = require('../lib/transform/parse_properties')
const loadProperties = require('../lib/load/load_properties')

describe('load properties on wikibase', () => {
  it('should return an object of Wikibase properties', done => {
    const propertyId = 'interxmarc:008:3233'
    const properties = parseProperties(robertFlemingNotice)
    // {
    //   'interxmarc:008:3233': {
    //     type: 'property',
    //     pseudoId: 'interxmarc:008:3233',
    //     datatype: 'string',
    //     aliases: { fr: 'interxmarc:008:3233' }
    //   }
    // }
    loadProperties(properties)
      .then((res) => {
        res.should.be.an.Object()
        res[propertyId].should.be.an.Object()
        res[propertyId].id.should.startWith('P')
        done()
      })
      .catch(done)
  })
})
