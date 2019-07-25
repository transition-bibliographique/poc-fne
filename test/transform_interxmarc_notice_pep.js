require('should')
const robertFlemingNotice = require('../echantillons/RobertFleming_BnF_14797579.json')
const parseProperties = require('../lib/transform/parse_properties')
const parseNotice = require('../lib/transform/parse_notice')

describe('create pseudo properties from an interxmarc pep', function () {
  this.timeout(20000)

  describe('transform controlfield', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'interxmarc:001:0001'
      const properties = parseProperties(robertFlemingNotice)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
  describe('transform leader', () => {
    it('should return an object of pseudo properties', done => {
      const propertyId = 'interxmarc:000:0004'
      const properties = parseProperties(robertFlemingNotice)
      const propertiesList = Object.keys(properties)
      propertiesList.includes(propertyId).should.be.true()
      done()
    })
  })
  it('should return an object of modelized pseudo properties', done => {
    const propertyId = 'interxmarc:p:031'
    const properties = parseProperties(robertFlemingNotice)
    const propertiesList = Object.keys(properties)
    propertiesList.includes(propertyId).should.be.true()
    // const property = propertiesList.find(prop => prop.pseudoId === propertyId)
    // property.datatype.should.equal('external-id')
    done()
  })
})

describe('create a pseudo item from an interxmarc pep', () => {
  describe('transform datafield', () => {
    it('should return a pseudo item id', done => {
      const itemPseudoId = '0  b.Fleming.Robert.1921-1976'
      const { items } = parseNotice(robertFlemingNotice)
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
      const itemPropertyPseudoId = 'interxmarc:001:0001'
      const { items } = parseNotice(robertFlemingNotice)
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
      const { items } = parseNotice(robertFlemingNotice)
      const item = items[0]
      item.claims.should.be.an.Object()
      item.claims[itemPropertyPseudoId].should.be.an.Array()
      item.claims[itemPropertyPseudoId][0].should.equal('00615')
      done()
    })
  })

  describe('add modelized claims', () => {
    it('should add modelized claim', done => {
      const { items } = parseNotice(robertFlemingNotice)
      const [ oeuvreItem ] = items
      oeuvreItem.claims['interxmarc:s:031'].should.be.an.Array()
      const claim = oeuvreItem.claims['interxmarc:s:031'][0]
      claim.should.be.an.Object()
      claim.value.should.be.a.String()
      done()
    })
  })
})
