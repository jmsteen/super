const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Follow = mongoose.model("Follow", FollowSchema);