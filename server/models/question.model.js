const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title: {
        type: String,
        //required: true
    },
    skill: {
        type: String,
        enum: ['javascript', 'react', 'java', 'python', 'mongodb'],
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    code: {
        type: String
    },
    imageUrl: {
        type: String,
    },
    userOwner: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    userViewed: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    tryHelp: {
        type: Boolean,
        default: false
    },
    video_id: {
        type: String,
        default: null
    },
    match: {
        type: [String],
    }
    //TODO añadir aqui el ide del usuario que lo haya visto o que se haya renderizado o con un boton 

}, {timestamps:true})




const Question = mongoose.model("Question", questionSchema)
module.exports = Question