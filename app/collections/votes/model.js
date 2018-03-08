const mongoose = require('mongoose')

const makeRef = require('../../schema/makeRef')

const voteSchema = new mongoose.Schema({
  person: makeRef('Person'),
  nomination: makeRef('Nomination')
})

module.exports = mongoose.model('Vote', voteSchema)
