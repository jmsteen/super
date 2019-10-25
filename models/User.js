const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
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
  ref: 'Article',
  localField: '_id',
  foreignField: 'author'
});

UserSchema.virtual('likes', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'user'
});

UserSchema.set('toObject', {
  virtuals: true
});

UserSchema.set('toJSON', {
  virtuals: true
});

module.exports = User = mongoose.model("User", UserSchema);
