require('should')
const sampleBNFpep = require('./fixtures/sample_BNF_pep.json')
const parseProperties = require('../lib/transform/parse_properties')
const loadProperties = require('../lib/load/load_properties')

describe('load properties on wikibase', function () {
  this.timeout(20000)

  it('should return an object of Wikibase properties', done => {
    const properties = parseProperties(sampleBNFpep)
    const pseudoPropertyId = Object.keys(properties)[0]
    loadProperties(properties)
      .then((res) => {
        res.should.be.an.Object()
        res[pseudoPropertyId].should.be.an.Object()
        res[pseudoPropertyId].id.should.startWith('P')
        done()
      })
      .catch(done)
  })

  it('should not create a property that already exists', done => {
    const properties = parseProperties(sampleBNFpep)
    const pseudoPropertyId = Object.keys(properties)[0]
    loadProperties(properties)
      .then((res1) => {
        const propertyId = res1[pseudoPropertyId].id
        return loadProperties(properties)
          .then((res2) => {
            res2[pseudoPropertyId].id.should.equal(propertyId)
            done()
          })
      })
      .catch(done)
  })
})
