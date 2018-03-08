const express = require('express')

const Nomination = require('./model')

const router = express.Router()

router.get('/nominations', (req, res, next) => {
  Nomination.find()
    .then(nominations => {
      res.json({nominations})
    })
    .catch(next)
})

router.post('/nominations', (req, res, next) => {
  new Nomination(req.body.nomination)
    .save()
    .then(nomination => {
      res.json({nomination})
    })
    .catch(next)
})

router.put('/nominations/:_id', (req, res, next) => {
  Nomination.findByIdAndUpdate(req.params._id, req.body.nomination, {new: true})
    .then(nomination => {
      if (nomination) {
        res.json({nomination})
      } else {
        next(new Error('Not Found'))
      }
    })
    .catch(next)
})

router.delete('/nominations/:id', (req, res, next) => {
  Nomination.findOneAndRemove(req.params._id)
    .then(() => {
      console.log('Removed')
      res.json({message: 'Removed'})
    })
    .catch(next)
})

module.exports = router
