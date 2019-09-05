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

  describe('pivot property claims', () => {
    it('should return "Nom" claims', done => {
      const item = parseNotice(sampleABESpersonne).items[0]
      item.claims['Nom'].should.be.an.Array()
      const claim = item.claims['Nom'][0]
      claim.value.should.equal('Pasolini')
      claim.references[0].should.deepEqual({
        'identifiant de la zone': 'unimarc_200',
        'données source de la zone': '$7 ba0yba0y $9 0 $a Pasolini $b Pier Paolo $f 1922-1975'
      })
      done()
    })

    it('should return "Prénom" claims', done => {
      const item = parseNotice(sampleABESpersonne).items[0]
      item.claims['Prénom'].should.be.an.Array()
      const claim = item.claims['Prénom'][0]
      claim.value.should.equal('Pier Paolo')
      claim.references[0].should.deepEqual({
        'identifiant de la zone': 'unimarc_200',
        'données source de la zone': '$7 ba0yba0y $9 0 $a Pasolini $b Pier Paolo $f 1922-1975'
      })
      done()
    })

    it('should return "Date de naissance" claims', done => {
      const item = parseNotice(sampleABESpersonne).items[0]
      item.claims['Date de naissance'].should.be.an.Array()
      const claim = item.claims['Date de naissance'][0]
      claim.value.should.equal('1922-03-05')
      claim.references[0].should.deepEqual({
        'identifiant de la zone': 'unimarc_103',
        'données source de la zone': '$a 19220305 $b 19751102'
      })
      done()
    })

    it('should return "Date de décès" claims', done => {
      const item = parseNotice(sampleABESpersonne).items[0]
      item.claims['Date de décès'].should.be.an.Array()
      const claim = item.claims['Date de décès'][0]
      claim.value.should.equal('1975-11-02')
      claim.references[0].should.deepEqual({
        'identifiant de la zone': 'unimarc_103',
        'données source de la zone': '$a 19220305 $b 19751102'
      })
      done()
    })

    it('should not return non-pep type specific claims', done => {
      const item = parseNotice(sampleABESpersonne).items[0]
      should(item.claims["Titre de l'oeuvre"]).not.be.ok()
      should(item.claims["Langue de l'oeuvre"]).not.be.ok()
      done()
    })
  })
})
