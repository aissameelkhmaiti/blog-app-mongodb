const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const secretKey = 'raja';
//creer utilisateur
exports.registre = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const result = await newUser.save();
    const token = jwt.sign({ userId: result.id, email: result.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
//connexion
exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const user = await User.findOne({ email });

  if (user && password === user.password) {
    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid data' });
  }
};
//liste utilisateur
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
//utilisateur par id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
//update utilisateur par id
exports.updateUserById = async (req, res) => {
  try {
    req.body.updatedAt = new Date();
    const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userUpdated) {
      res.status(404).json("User not found");
    }
    res.json(userUpdated);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
//delete utilisateur by id
exports.deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
