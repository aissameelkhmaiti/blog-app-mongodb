const express=require('express')
const postController=require('../controllers/postController')
const { verifierToken,autoriserAdmin } = require('../middlewares/authentificationTken');
const router=express.Router()
router.get('/',(req,res)=>{
    res.send("hello to home page")
}
)
router.post('/posts',verifierToken, postController.createPost);

router.get('/posts', verifierToken, postController.getAllpostss);
router.get('/posts/:id', verifierToken, postController.getPostById);
router.put('/posts/:id', verifierToken, postController.updatePostById);
router.delete('/posts/:id', verifierToken, postController.deletePostById);
module.exports=router;