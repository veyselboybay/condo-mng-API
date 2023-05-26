const mongoose = require('mongoose')

const User = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userGroup: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true 
    },
    unitNo: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', User);