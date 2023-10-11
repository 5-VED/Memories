const express = require("express")
const router = express.Router()
const { createPost, getPost, getAllPosts } = require('../Controllers/memories.controller');
const uploads = require('../Config/multerConfig');
const { authenticated } = require("../Config/authConfig");


router.post('/newPost', uploads.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 1 },
]), createPost);

router.get('/getPost/:id', authenticated, getPost);
router.get('/getAllPost/:userId', authenticated, getAllPosts);


module.exports = router


