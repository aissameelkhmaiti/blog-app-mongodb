const Post = require('../models/Post');
const { validationResult } = require('express-validator');
//creer post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const post = await newPost.save();
    res.json({ post });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
//all post
exports.getAllpostss = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
//post by id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("User not found");
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
//update post by id
exports.updatePostById = async (req, res) => {
  try {
    req.body.updatedAt = new Date();
    const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!postUpdated) {
      res.status(404).json("User not found");
    }
    res.json(postUpdated);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
//delete post by id
exports.deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
