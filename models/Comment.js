const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  body: {
    type: String,
    required: true
  },

  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

CommentSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'comment'
});

CommentSchema.set('toObject', {
  virtuals: true
});

CommentSchema.set('toJSON', {
  virtuals: true
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);
