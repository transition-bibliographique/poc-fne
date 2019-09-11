require('should')
const getOrLoadHardCodedEntities = require('../lib/load/get_or_load_hard_coded_entities')

describe('get_or_load_hard_coded_entities', function () {
  this.timeout(20000)

  it('should return an object of hard coded properties', done => {
    const hardCodedPropertyPseudoId = 'Date de naissance'
    getOrLoadHardCodedEntities()
    .then(({ properties }) => {
      const hardCodedProperty = properties[hardCodedPropertyPseudoId]
      hardCodedProperty.should.be.an.Object()
      hardCodedProperty.datatype.should.equal('time')
      hardCodedProperty.pseudoId.should.equal(hardCodedPropertyPseudoId)
      hardCodedProperty.id.should.startWith('P')
      done()
    })
    .catch(done)
  })

  it('should return an object of hard coded items', done => {
    const hardCodedItemPseudoId = 'œuvre'
    getOrLoadHardCodedEntities()
    .then(({ items, properties }) => {
      const hardCodedItem = items[hardCodedItemPseudoId]
      const typePropertyId = properties["Type d'entité"].id
      hardCodedItem.should.be.an.Object()
      should(hardCodedItem.datatype).not.be.ok()
      hardCodedItem.pseudoId.should.equal(hardCodedItemPseudoId)
      hardCodedItem.id.should.startWith('Q')
      done()
    })
    .catch(done)
  })
})
