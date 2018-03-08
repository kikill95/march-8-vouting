const mongoose = require('mongoose')

const nominationSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true}
})

module.exports = mongoose.model('Nomination', nominationSchema)
