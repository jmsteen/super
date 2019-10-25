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

  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Like'
  }],

  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Comment = mongoose.model("Comment", CommentSchema);
