

const postController = async (req, res) => {
    return res.status(200).json({success:true, msg: 'posts'})
}


module.exports = {postController}