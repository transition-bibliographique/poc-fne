require('should')
const lesReveriesDuPromeneur = require('./fixtures/LesReveriesDuPromeneur_BnF_11935154.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')

describe('create pseudo properties from an interxmarc work', () => {
  describe('transform datafield', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'interxmarc:600:a:0'
      const properties = parseProperties(lesReveriesDuPromeneur)
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
      const propertyId = 'interxmarc:001:0001'
      const properties = parseProperties(lesReveriesDuPromeneur)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
  describe('transform leader', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'interxmarc:000:0004'
      const properties = parseProperties(lesReveriesDuPromeneur)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
})

describe('create a pseudo item from an interxmarc work', () => {
  describe('transform datafield', () => {
    it('should return a pseudo item id', done => {
      const itemId = '.0..b.fre..Les rêveries du promeneur solitaire'
      const items = parseNotice(lesReveriesDuPromeneur)
      const item = items[0]
      item.should.be.an.Object()
      item.pseudoId.should.equal(itemId)
      item.labels.fr.should.equal(itemId)
      done()
    })
  })
  describe('transform datacontrol', () => {
    it('should return pseudo claims', done => {
      const itemPropertyPseudoId = 'interxmarc:001:0001'
      const items = parseNotice(lesReveriesDuPromeneur)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('FR')
      done()
    })
  })
  describe('transform leader', () => {
    it('should return pseudo claims', done => {
      const itemPropertyPseudoId = 'interxmarc:000:0004'
      const items = parseNotice(lesReveriesDuPromeneur)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('00469')
      done()
    })
  })
})