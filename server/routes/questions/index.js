const express = require('express')
const router = express.Router()
const Questions = require("./../../models/question.model")
// Endpoints
router.get('/', (req, res, next) =>{
    Questions.find()
    .then()



} )

module.exports = router