const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifierToken,autoriserAdmin } = require('../middlewares/authentificationTken');

router.post('/signup', userController.registre);
router.get('/check',verifierToken,(req,res)=>{
    const userId = req.userId;
    const userRole = req.userRole; 
    res.json({ userId, userRole });
})
router.post('/login', userController.login);
router.get('/users', verifierToken ,autoriserAdmin('admin'), userController.getAllUsers);
router.get('/users/:id', verifierToken, userController.getUserById);
router.put('/users/:id', verifierToken, userController.updateUserById);
router.delete('/users/:id', verifierToken,autoriserAdmin('admin'), userController.deleteUserById);

module.exports = router;
