const express = require('express')
const router = express.Router()

const User = require('../../models/user.model')
const Question = require('../../models/question.model')
const { find } = require('../../models/user.model')

// Endpoints

router.get('/:user_id', (req, res, next) => {
    
    const promise1 = User.findById(req.params.user_id)
    const promise2 = Question.find({ "userOwner": req.params.user_id })
    const promise3 = Question.find()
    
    Promise
    .all([promise1,promise2,promise3])
    .then(allInfo => res.json(allInfo))
    .catch(err => next(err))
    
})

router.get('/edit/:user_id', (req, res, next) => {
    User.findById(req.params.user_id)
    .then(user => res.send(user))
    .catch(err => next(err))
    
})

router.post('/edit/:user_id', (req, res, next) => {
    console.log(req.body,'<----------------------------')
    User
    .findByIdAndUpdate(req.params.user_id, req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
    
    
})
router.post('/edit/delete/:user_id', (req, res, next) => {
    
    res.send('estas eliminando tu perfil')///////////////////////////////////////
    
})
router.post('/question/new', (req, res, next) => {
   
    Question
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => next(err))
})
router.post('/helper/:searchName',(req,res,next) => {
    User
    .findOneAndUpdate({ "username": req.params.searchName },{ $push: { rating: req.body.rating ,comments:req.body.comments,}})
    .then(response => res.json(response))
    .catch(err => next(err))

})

module.exports = router
