const express = require('express')

const Vote = require('./model')

const router = express.Router()

router.get('/votes', (req, res, next) => {
  Vote.find()
    .then(votes => {
      res.json({votes})
    })
    .catch(next)
})

router.post('/votes', (req, res, next) => {
  new Vote(req.body.vote)
    .save()
    .then(vote => {
      res.json({vote})
    })
    .catch(next)
})

router.put('/votes/:_id', (req, res, next) => {
  Vote.findByIdAndUpdate(req.params._id, req.body.vote, {new: true})
    .then(vote => {
      if (vote) {
        res.json({vote})
      } else {
        next(new Error('Not Found'))
      }
    })
    .catch(next)
})

router.delete('/votes/:id', (req, res, next) => {
  Vote.findOneAndRemove(req.params._id)
    .then(() => {
      console.log('Removed')
      res.json({message: 'Removed'})
    })
    .catch(next)
})

module.exports = router
