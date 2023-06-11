const mongoose = require('mongoose')


const carSchema = mongoose.Schema({
    licensePlate: {
        type: String,
        required:true,
    },
    year: {
        type: Number,
        required: true,
    },
    model: {
        type: String,
        required:true,
    },
    make: {
        type: String,
        required:true,
    }
})


module.exports = mongoose.model('Car', carSchema);