const postRouter = require('express').Router()
const { postController } = require('../controller/post_controller')

postRouter.get('/posts',postController)


module.exports = postRouter;