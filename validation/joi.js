const joi = require('joi');


const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    userGroup: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    unitNo: joi.number()
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

const carSchema = joi.object({
    licensePlate: joi.string().required(),
    year: joi.number().required(),
    model: joi.string().required(),
    make: joi.string().required()
})

const parkingSchema = joi.object({
    unitNo: joi.string().required(),
    parkingType: joi.string().required(),
})


module.exports = {userSchema,loginSchema, carSchema, parkingSchema}