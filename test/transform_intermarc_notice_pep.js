require('should')
const sampleBNFpep = require('./fixtures/sample_BNF_pep.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')

describe('create pseudo properties from an intermarc pep', function () {
  this.timeout(20000)

  describe('transform controlfield', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'intermarc_001'
      const properties = parseProperties(sampleBNFpep)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
  describe('transform leader', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'intermarc_leader'
      const properties = parseProperties(sampleBNFpep)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
})

describe('create a pseudo item from an intermarc pep', () => {
  describe('transform datafield', () => {
    it('should return a pseudo item id', done => {
      const itemPseudoId = '0  b.Fleming.Robert.1921-1976'
      const { items } = parseNotice(sampleBNFpep)
      const item = items[0]
      item.should.be.an.Object()
      item.pseudoId.should.equal(itemPseudoId)
      item.labels.en.should.equal(itemPseudoId)
      item.labels.fr.should.equal(itemPseudoId)
      done()
    })
  })
  describe('transform datacontrol', () => {
    it('should return pseudo claims', done => {
      const itemPropertyPseudoId = 'intermarc_001'
      const { items } = parseNotice(sampleBNFpep)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('FRBNF14797579X')
      done()
    })
  })

  describe('add modelized claims', () => {
    it('should add modelized claim', done => {
      const { items } = parseNotice(sampleBNFpep)
      const [ oeuvreItem ] = items
      const pseudoPropertyId = 'intermarc_p_031'
      oeuvreItem.claims[pseudoPropertyId].should.be.an.Array()
      const claim = oeuvreItem.claims[pseudoPropertyId][0]
      claim.should.be.an.Object()
      claim.value.should.be.equal('0000000073689743')
      claim.references.should.be.an.Array()
      const reference = claim.references[0]
      reference.should.be.an.Object()
      reference['date de consultation'][0].should.equal('2013-08-02')
      done()
    })
  })
})
