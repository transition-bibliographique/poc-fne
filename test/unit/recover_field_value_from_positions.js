require('should')
const recoverFieldValueFromPositions = require('../../lib/recover_field_value_from_positions')
const lesReveriesDuPromeneur = require('../fixtures/LesReveriesDuPromeneur_BnF_11935154.json')

const { Pos } = lesReveriesDuPromeneur.controlfield[1]

it('should recover field value from positions', done => {
  const value = recoverFieldValueFromPositions(Pos)
  value.should.equal('810213060208yyfre           1776      1778                   010')
  done()
})
