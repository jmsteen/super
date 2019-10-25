const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  value: {
    type: Number,
    required: true
  },

  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
  },

  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Like = mongoose.model("Like", LikeSchema);