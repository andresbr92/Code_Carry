const express = require('express')
const router = express.Router()
const Questions = require("./../../models/question.model")


router.get('/details/:question_id', (req, res, next) => {
    Questions
        .findById(req.params.question_id)
        .then(response => res.json(response))
        .catch(err => next(err))

})

router.get('/',(req,res,next) => {
    Questions
    .find()
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post('/delete/:question_id',(req,res,next) => {
    Questions
      .findByIdAndRemove(req.params.question_id)
      .then((response) => console.log(response))//////////////////////////////////Que poner aki
      .catch(error => next(error))

})

router.post('/tryHelp/:question_id', (req, res, next) => {
    Questions
        .findByIdAndUpdate(req.params.question_id, {
            tryHelp: true,
            video_id: req.body.video_id,
            match: req.body.match
        })
        .then(response => console.log(response))
        .catch(err =>  console.log (err))

})

router.get('/codemirror/getQuestion/:video_id', (req, res) => { 
    Questions
        .find({ "video_id": req.params.video_id })
        .then(response => res.json(response))
        .catch(err => console.log (err))
})



module.exports = router