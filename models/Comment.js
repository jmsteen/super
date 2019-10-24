const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  body: {
    type: String,
    required: true
  },

  article: {
    type: Schema.Types.ObjectId,
    ref: 'articles',
    required: true
  },

  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'likes'
  }],

  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Comment = mongoose.model("comments", CommentSchema);
