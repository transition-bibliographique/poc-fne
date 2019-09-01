require('should')
const sampleBNFwork = require('./fixtures/sample_BNF_work.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')

describe('create pseudo properties from an intermarc oeuvre', () => {
  describe('transform datafield', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'intermarc_600_a_0'
      const properties = parseProperties(sampleBNFwork)
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
      const propertyId = 'intermarc_001'
      const properties = parseProperties(sampleBNFwork)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
  describe('transform leader', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'intermarc_leader'
      const properties = parseProperties(sampleBNFwork)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
})

describe('create a pseudo item from an intermarc oeuvre', () => {
  describe('transform datafield', () => {
    it('should return a pseudo item id', done => {
      const itemId = '.0..b.fre..Les rêveries du promeneur solitaire'
      const { items } = parseNotice(sampleBNFwork)
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
      const itemPropertyPseudoId = 'intermarc_001'
      const { items } = parseNotice(sampleBNFwork)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('FRBNF119351548')
      done()
    })
  })
  describe('transform leader', () => {
    it('should return pseudo claims', done => {
      const itemPropertyPseudoId = 'intermarc_leader'
      const { items } = parseNotice(sampleBNFwork)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('00469c1 as22000272  45')
      done()
    })
  })

  describe('pep relation', () => {
    it('should return a pep item', done => {
      const { items, relations } = parseNotice(sampleBNFwork)
      const [ oeuvreItem, pepItem ] = items
      const pepPseudoId = '11922879.ISNI0000000121451116..0..b......Rousseau.Jean-Jacques.1712-1778'
      pepItem.pseudoId.should.equal(pepPseudoId)
      relations[0].subject.should.equal(oeuvreItem.pseudoId)
      relations[0].property.should.equal('intermarc_s_100')
      relations[0].object.should.equal(pepPseudoId)
      done()
    })
  })

  describe('pivot property claims', () => {
    it('should return "URL pérenne" claims', done => {
      const { items } = parseNotice(sampleBNFwork)
      const [ oeuvreItem ] = items
      oeuvreItem.claims["URL pérenne"].should.be.an.Array()
      const claim = oeuvreItem.claims["URL pérenne"][0]
      claim.value.should.equal('http://catalogue.bnf.fr/ark:/12148/cb11935154w')
      claim.references.should.be.an.Array()
      const reference = claim.references[0]
      reference.should.deepEqual({
        'identifiant de la zone': 'intermarc_003',
        'données source de la zone': 'http://catalogue.bnf.fr/ark:/12148/cb11935154w'
      })
      done()
    })
  })
})
