const postModel = require('../Models/postModel')
const userModel = require('../Models/user')

const getAllPosts = async (req, res) => {
    // get all the post from database
    const posts = await postModel.find({}); 
    return res.status(200).json({success:true, msg: 'posts', posts: posts})
}

const createPost = async (req, res) => {
    // check if the real user creates a post
    const isUser = await userModel.findOne({ _id: req.body.idByWho });
    if (!isUser) {
        return res.status(400).json({ success: false, msg: 'Not a real user' });
    }
    // check if the correct user group is submitted
    if (req.body.userGroup !== isUser.userGroup) {
        return res.status(400).json({success:false,msg:'Not a correct user group entered, please check'})
    }
    try {
        // create a new post instance
        const createdPost = await postModel(req.body);
        // save it to database
        await createdPost.save();
        return res.status(200).json({success: true, msg:'Post is created'})
    } catch (error) {
        // return error
        return res.status(500).json({success:false, msg: error})
    }
}

const getOnePost = async (req, res) => {
    // get the post id from params
    const postId = req.params.postId;
    // check the post id exists
    if (!postId) {
        return res.status(400).json({success: false, msg:'post id is missing'})
    }
    try {
        const post = await postModel.findOne({ _id: postId });
        return res.status(200).json({ success: true, post: post });
    } catch (error) {
        return res.status(500).json({success:false, msg: error})
    }
}

const editPost = async (req, res) => {
    const postId = req.params.postId;
    // check the post id exists
    if (!postId) {
        return res.status(400).json({success: false, msg:'post id is missing'})
    }
    // check if the post exist
    const isValidPost = await postModel.findOne({ _id: postId });
    if (!isValidPost) {
        return res.status(400).json({ success: false, msg: 'Post is not available' });
    }

    // get edited post
    const newPost = req.body;
    try {
        const editedPost = await postModel.updateOne({ _id: postId }, newPost);
        return res.status(200).json({success:true,msg: 'Post updated'})
    } catch (error) {
        return res.status(500).json({success:false, msg: error})
    }

}

module.exports = {getAllPosts,createPost, getOnePost, editPost}