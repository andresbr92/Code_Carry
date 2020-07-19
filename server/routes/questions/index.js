const express = require('express')
const router = express.Router()
const Questions = require("./../../models/question.model")

router.get('/details/:question_id', (req, res, next) => {
    Questions
        .findById(req.params.question_id)
        .then(response => res.json(response))
        .catch(err => next(err))

})

module.exports = router