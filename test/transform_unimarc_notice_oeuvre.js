require('should')
const sampleABESwork = require('./fixtures/sample_ABES_work.json')
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
})
