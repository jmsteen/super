const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    }
});

ArticleSchema.virtual('likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'article'
});

ArticleSchema.virtual('comments', {
    ref: 'Like',
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