require('should')
const sampleABESwork = require('./fixtures/sample_ABES_work.json')
const sampleABESwork2 = require('./fixtures/sample_ABES_work_2.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')

describe('create pseudo properties from an unimarc oeuvre', () => {
  describe('transform datafield', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'unimarc_035_a_0'
      const properties = parseProperties(sampleABESwork)
      properties.should.be.an.Object()
      const propertiesList = Object.keys(properties)
      propertiesList.should.be.an.Array()
      propertiesList.includes(propertyId).should.be.true()
      properties[propertyId].pseudoId.should.equal(propertyId)
      properties[propertyId].labels.en.should.equal(propertyId)
      properties[propertyId].labels.fr.should.equal(propertyId)
      properties[propertyId].datatype.should.equal('string')
      done()
    })
  })
  describe('transform controlfield', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'unimarc_001'
      const properties = parseProperties(sampleABESwork)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
  describe('transform leader', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'unimarc_leader'
      const properties = parseProperties(sampleABESwork)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
})

describe('create a pseudo item from an unimarc oeuvre', () => {
  describe('transform datafield', () => {
    it('should return a pseudo item id', done => {
      const itemId = '20041209afrey50      ba0'
      const { items } = parseNotice(sampleABESwork)
      const item = items[0]
      item.should.be.an.Object()
      item.pseudoId.should.equal(itemId)
      item.labels.fr.should.equal(itemId)
      Object.keys(item.claims).forEach(pseudoPropertyId => {
        const propClaims = item.claims[pseudoPropertyId]
        propClaims.forEach(value => {
          should(value).be.ok()
        })
      })
      done()
    })
  })
  describe('transform datacontrol', () => {
    it('should return pseudo claims', done => {
      const itemPropertyPseudoId = 'unimarc_001'
      const { items } = parseNotice(sampleABESwork)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('082349983')
      done()
    })
  })
  describe('transform leader', () => {
    it('should return pseudo claims', done => {
      const itemPropertyPseudoId = 'unimarc_leader'
      const { items } = parseNotice(sampleABESwork)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('cx  f22     3  45')
      done()
    })
  })

  describe('pep relation', () => {
    it('should return a pep item', done => {
      const { items, relations } = parseNotice(sampleABESwork)
      const [ oeuvreItem, pepItem ] = items
      const pepPseudoId = 'Pasolini, Pier Paolo (1922-1975)'
      pepItem.pseudoId.should.equal(pepPseudoId)
      relations[0].subject.should.equal(oeuvreItem.pseudoId)
      relations[0].property.should.equal('unimarc_Tu_440')
      relations[0].object.should.equal(pepPseudoId)
      done()
    })
  })

  describe('pivot property claims', () => {
    it('should return "Titre de l\'oeuvre" claims from unimarc_240', done => {
      const item = parseNotice(sampleABESwork2).items[0]
      item.claims["Titre de l'oeuvre"].should.be.an.Array()
      const claim = item.claims["Titre de l'oeuvre"][0]
      claim.value.should.equal('Alcools')
      claim.references.should.be.an.Array()
      const reference = claim.references[0]
      reference.should.deepEqual({
        'identifiant de la zone': 'unimarc_240',
        'données source de la zone': '$7 ba0yba0y $a Apollinaire, Guillaume (1880-1918) $t Alcools'
      })
      done()
    })

    it('should return "Titre de l\'oeuvre" claims from unimarc_230', done => {
      const item = parseNotice(sampleABESwork).items[0]
      item.claims["Titre de l'oeuvre"].should.be.an.Array()
      const claim = item.claims["Titre de l'oeuvre"][0]
      claim.value.should.equal('Il Decameron')
      claim.references.should.be.an.Array()
      const reference = claim.references[0]
      reference.should.deepEqual({
        'identifiant de la zone': 'unimarc_230',
        'données source de la zone': '$7 ba0yba0y $8 freita $9 0 $a Il Decameron $n film'
      })
      done()
    })

    it('should return "Langue de l\'oeuvre" claims', done => {
      const item = parseNotice(sampleABESwork).items[0]
      item.claims["Langue de l'oeuvre"].should.be.an.Array()
      const claim = item.claims["Langue de l'oeuvre"][0]
      claim.value.should.equal('ita')
      claim.references.should.be.an.Array()
      const reference = claim.references[0]
      reference.should.deepEqual({
        'identifiant de la zone': 'unimarc_101',
        'données source de la zone': '$a ita'
      })
      done()
    })

    it('should not return non-oeuvre type specific claims', done => {
      const item = parseNotice(sampleABESwork).items[0]
      should(item.claims['Nom']).not.be.ok()
      should(item.claims['Prénom']).not.be.ok()
      should(item.claims['Date de naissance']).not.be.ok()
      should(item.claims['Date de décès']).not.be.ok()
      should(item.claims['Activité']).not.be.ok()
      done()
    })
  })
})
