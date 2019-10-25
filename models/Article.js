const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'likes'
    }]
});

module.exports = Article = mongoose.model('articles', ArticleSchema);