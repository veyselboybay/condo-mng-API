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


module.exports = {userSchema,loginSchema}