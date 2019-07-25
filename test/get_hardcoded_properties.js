require('should')
const loadHardCodedProperties = require('../lib/load/load_hard_coded_properties')

it('should return an object of hard coded properties', done => {
  const hardCodedPropertyPseudoId = 'date de consultation'
  loadHardCodedProperties()
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
