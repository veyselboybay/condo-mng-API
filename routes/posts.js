const postRouter = require('express').Router()
const { getAllPosts, createPost, getOnePost, editPost } = require('../controller/post_controller')

// get all posts
postRouter.get('/posts', getAllPosts)
// create a post
postRouter.post('/createPost', createPost)
// get one post
postRouter.get('/post/:postId', getOnePost)
// edit post
postRouter.post('/post/:postId', editPost)


module.exports = postRouter;