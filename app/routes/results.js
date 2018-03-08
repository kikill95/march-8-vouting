const express = require('express')

const Vote = require('../collections/votes/model')

const router = express.Router()

router.get('/results', (req, res, next) => {
  Vote.find()
    .populate('person')
    .populate('nomination')
    .then(votes => {
      let results = {}
      votes.forEach(vote => {
        if (!vote.nomination || !vote.person) {
          return
        }
        let nominationKey = vote.nomination.title
        let personKey = vote.person.name
        if (results[nominationKey]) {
          if (results[nominationKey][personKey]) {
            results[nominationKey][personKey] += 1
          } else {
            results[nominationKey][personKey] = 1
          }
        } else {
          results[nominationKey] = {[personKey]: 1}
        }
      })
      res.json({results})
    })
    .catch(next)
})

module.exports = router
