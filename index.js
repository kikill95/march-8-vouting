const connect = require('./app/lib/db').connect
const config = require('./app/lib/config')
const startServer = require('./app/server')

connect(config.mongoUrl)
  .then(mongoConnection => startServer(config.port))
  .catch(console.error)
