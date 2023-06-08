
const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required:true,  
    },
    idByWho: {
        type: String,
        required: true,
    },
    userGroup: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('post',postSchema)