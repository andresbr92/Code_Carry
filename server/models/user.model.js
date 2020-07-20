const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        default: 'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg'

    },
    email: {
        type: String,
        //required: true
    },
    skill: {
        type: [String],
        enum: ['javascript', 'react', 'java', 'python', 'mongodb']
    },
   
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'question'
    }],
    notifications: [{
        type: String,
        enum: ['javascript', 'react', 'java', 'python', 'mongodb']
    }],



}, {timestamps:true})

const User = mongoose.model("User", userSchema)
module.exports = User












 // prestige: {
    //     type: [Number],
    //     enum: [1, 2, 3, 4, 5]
    // },
    // hisComments: [{
    //     theComment: {
    //         type: String
    //     },
    //     puntuation: {
    //         type: Number,
    //         enum: [1, 2, 3, 4, 5]
    //     },
    //     from: {
    //         type: String
    //     }

    // }],