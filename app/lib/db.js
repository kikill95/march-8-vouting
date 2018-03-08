const mongoose = require('mongoose')

process.on('SIGINT', () => {
  mongoose.disconnect()
    .then(() => {
      console.log('Disconnected')
      process.exit()
    })
})

module.exports.connect = mongoUrl => mongoose.connect(mongoUrl)
