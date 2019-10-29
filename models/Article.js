const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    body: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    
    date: {
        type: Date,
        default: Date.now
    }
});

ArticleSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'article'
});

ArticleSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'article'
});

ArticleSchema.set('toObject', {
    virtuals: true
});

ArticleSchema.set('toJSON', {
    virtuals: true
});

module.exports = Article = mongoose.model('Article', ArticleSchema);