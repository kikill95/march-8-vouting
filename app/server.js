const express = require('express')
const bodyParser = require('body-parser')

const person = require('./collections/persons/routes')
const nomination = require('./collections/nominations/routes')
const vote = require('./collections/votes/routes')

const results = require('./routes/results')

module.exports = startServer

function startServer (port) {
  const app = express()

  app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
  })
  app.use(bodyParser.json())

  app.use('/api/v1', person)
  app.use('/api/v1', nomination)
  app.use('/api/v1', vote)
  app.use('/api/v1', results)
  // added for development
  app.get('/favicon.ico', (req, res) => {
    res.status(204)
  })

  // error handling
  app.use((req, res, next) => {
    const err = new Error(`Not Found ${req.path}`)
    err.status = 404
    next(err)
  })
  app.use((error, req, res, next) => {
    if (error) {
      return res.status(400).json({error: error.message || 'Server error'})
    }
    next(error)
  })
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })

  return app
}
