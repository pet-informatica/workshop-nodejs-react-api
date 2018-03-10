const mongoose = require('mongoose')
const Comment = require('./comment')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    tags: [String]
})

module.exports = mongoose.model('Post', postSchema)