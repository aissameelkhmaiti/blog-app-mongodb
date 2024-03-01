const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifierToken } = require('../middlewares/authentificationTken');

router.post('/signup', userController.registre);
router.post('/login', userController.login);
router.get('/users', verifierToken, userController.getAllUsers);
router.get('/users/:id', verifierToken, userController.getUserById);
router.put('/users/:id', verifierToken, userController.updateUserById);
router.delete('/users/:id', verifierToken, userController.deleteUserById);

module.exports = router;
