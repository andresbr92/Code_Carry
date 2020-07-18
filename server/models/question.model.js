const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    skill: {
        type: [String],
        enum: ['javascript', 'react', 'java', 'python', 'mongodb'],
        required: true
    },
    description: {
       type: String,
        required: true
    },
    image_url: {
        type: String,
    },
    userOwner: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

})




const Question = mongoose.model("Question", questionSchema)
module.exports = Question