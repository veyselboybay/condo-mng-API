const parkingModel = require('../Models/parking')
const carModel = require('../Models/car')
const { carSchema, parkingSchema } = require('../validation/joi')

const getAllParkingInfo = async (req, res) => {
    
    try {
        const parkings = await parkingModel.find({});
        const cars = await carModel.find({});
        return res.status(200).json({ success: true, msg: 'parking info', parkings, cars });
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'something went wrong' });
    }
}

const createParking = async (req, res) => {
    const { licensePlate, year, model, make, unitNo, parkingType } = req.body;
    // validate the user input for car
    const { error } = carSchema.validate({ licensePlate, year, model, make });
    if (error) {
        return res.status(400).json({ success: false, msg: error.details[0].message });
    }
    // validate the user input for parking info
    const { error2 } = parkingSchema.validate({ unitNo, parkingType });
    if (error2) {
        return res.status(400).json({ success: false, msg: error2.details[0].message });
    }

    try {
        // save the car
        const newCar = await carModel({ licensePlate, year, model, make });
        const savedCar = await newCar.save();

        // save the parking info
        const newParking = await parkingModel({ unitNo, parkingType, car: savedCar._id });
        const saveParking = await newParking.save();

        return res.status(200).json({ success: true, msg: 'New Parking is created' });
    } catch (error) {
        return res.status(500).json({success:false, msg:error.message})
    }
}






module.exports = { getAllParkingInfo,createParking }