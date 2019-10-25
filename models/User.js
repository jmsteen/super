const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.virtual('articles', {
  ref: 'articles',
  localField: '_id',
  foreignField: 'author'
});

UserSchema.virtual('likes', {
  ref: 'likes',
  localField: '_id',
  foreignField: 'user'
});

UserSchema.set('toObject', {
  virtuals: true
});

UserSchema.set('toJSON', {
  virtuals: true
});

module.exports = User = mongoose.model("users", UserSchema);
