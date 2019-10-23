const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  value: {
    type: Number,
    required: true
  },

  article: {
    type: Schema.Types.ObjectId,
    ref: 'articles',
  },

  comment: {
    type: Schema.Types.ObjectId,
    ref: 'comments',
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Like = mongoose.model("likes", LikeSchema);