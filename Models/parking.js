const mongoose = require('mongoose')
const carModel = require('./car')


const parkingSchema = mongoose.Schema({
    unitNo: {
        type: String,
        required: true,
    },
    parkingType: {
        type: String,
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Car',
        required: true,
    }
})



module.exports = mongoose.model('Parking', parkingSchema);