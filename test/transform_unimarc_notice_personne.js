require('should')
const sampleABESpersonne = require('./fixtures/sample_ABES_personne.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')

describe('create pseudo properties from an unimarc personne', function () {
  this.timeout(20000)

  describe('transform controlfield', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'unimarc_001'
      const properties = parseProperties(sampleABESpersonne)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
  describe('transform leader', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'unimarc_leader'
      const properties = parseProperties(sampleABESpersonne)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
})

describe('create a pseudo item from an unimarc personne', () => {
  describe('transform datafield', () => {
    it('should return a pseudo item id', done => {
      const itemPseudoId = 'Pasolini, Pier Paolo (1922-1975)'
      const { items } = parseNotice(sampleABESpersonne)
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
      const itemPropertyPseudoId = 'unimarc_001'
      const { items } = parseNotice(sampleABESpersonne)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('027059456')
      done()
    })
  })
  describe('transform leader', () => {
    it('should return pseudo claims', done => {
      const itemPropertyPseudoId = 'unimarc_leader'
      const { items } = parseNotice(sampleABESpersonne)
      const item = items[0]
      item.claims.should.be.an.Object()

      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('cx  a22     3  45')
      done()
    })
  })
})
