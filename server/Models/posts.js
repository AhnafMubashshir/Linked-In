const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  creatorID: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    require: true,
  },
  images: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
