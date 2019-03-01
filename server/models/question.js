const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }],
    created_at: {
        type: Date,
        default: new Date
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }]
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question