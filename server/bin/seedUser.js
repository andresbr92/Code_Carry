
const mongoose = require("mongoose")
const User = require('../models/user.model')
const Question = require('../models/question.model')
const dbTitle = 'codecarry'

mongoose.connect(`mongodb://localhost/${dbTitle}`, { useUnifiedTopology: true, useNewUrlParser: true })



// User.collection.drop()
// Question.collection.drop()

const users = [
    {
        username: 'Andres Barros Rivas',
        password: '1234',
        image_url: null,
        email: 'andresbr92@gmail.com',
        skills: ['javascript', 'react'],
        role: 'ADMIN',
        questions: null,
        notifications: null

    },
    {
        username: 'Gabriel Moreno',
        password: '1234',
        image_url: null,
        email: 'gabitocho@gmail.com',
        skills: ['javascript', 'java'],
        role: 'ADMIN',
        questions: null,
        notifications: null

    }
]

const questions = [{
    title: 'Que fue antes el huevo o la gallina??',
    skills: ['javascript'],
    description: 'Problema tocho',
    image_url: 'https://awebytes.files.wordpress.com/2018/05/factorial_rescursiva.png?w=584',
    userOwner: null
}, {
    title: 'Las props nativas',
    skills: ['react'],
    description: 'Problema muy tocho',
    image_url: 'https://awebytes.files.wordpress.com/2018/05/factorial_rescursiva.png?w=584',
    userOwner: '5f130065006bb6df8056bf1b'
},]

const usersPromise = User.create(users)
const questionsPromise = Question.create(questions)

Promise
    .all([usersPromise, questionsPromise])
    .then(results => console.log(`Created ${results.length} seeds`))
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))
