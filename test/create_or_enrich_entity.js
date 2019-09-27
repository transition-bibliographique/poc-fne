require('should')
const createOrEnrich = require('../lib/load/create_or_enrich_entity')
const { uniqueId } = require('lodash')
const timestamp = () => (new Date()).getTime()

describe('create or enrich entity', function () {
  this.timeout(20000)

  describe('property', function () {
    it('should return a property with a datatype when creating', done => {
      const pseudoId = 'test-prop-' + timestamp()
      const datatype = 'wikibase-item'
      const property = {
        type: 'property',
        datatype,
        pseudoId,
        labels: { en: pseudoId, fr: pseudoId }
      }
      createOrEnrich(property)
        .then((createdProperty) => {
          console.log('createdProperty', createdProperty)
          createdProperty.id.should.startWith('P')
          createdProperty.datatype.should.equal(datatype)
          done()
        })
        .catch(done)
    })
  })
})
