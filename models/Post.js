const mongoose = require('mongoose');
const {verifierToken}=require('../middlewares/authentificationTken')
const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  author:{type:mongoose.Types.ObjectId,ref:'User',required:true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;