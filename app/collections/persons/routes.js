const express = require('express')

const Person = require('./model')

const router = express.Router()

router.get('/persons', (req, res, next) => {
  Person.find()
    .then(persons => {
      res.json({persons})
    })
    .catch(next)
})

router.post('/persons', (req, res, next) => {
  new Person(req.body.person)
    .save()
    .then(person => {
      res.json({person})
    })
    .catch(next)
})

router.put('/persons/:_id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params._id, req.body.person, {new: true})
    .then(person => {
      if (person) {
        res.json({person})
      } else {
        next(new Error('Not Found'))
      }
    })
    .catch(next)
})

router.delete('/persons/:id', (req, res, next) => {
  Person.findOneAndRemove(req.params._id)
    .then(() => {
      console.log('Removed')
      res.json({message: 'Removed'})
    })
    .catch(next)
})

module.exports = router
