require('should')
const getOrLoadHardCodedProperties = require('../lib/load/get_or_load_hard_coded_properties')

it('should return an object of hard coded properties', done => {
  const hardCodedPropertyPseudoId = 'Date de naissance'
  getOrLoadHardCodedProperties()
  .then((hardCodedProperties)=>{
    const hardCodedProperty = hardCodedProperties[hardCodedPropertyPseudoId]
    hardCodedProperty.should.be.an.Object()
    hardCodedProperty.datatype.should.equal('time')
    hardCodedProperty.pseudoId.should.equal(hardCodedPropertyPseudoId)
    hardCodedProperty.id.should.startWith('P')
    done()
  })
  .catch(done)
})
