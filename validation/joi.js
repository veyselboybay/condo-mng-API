const joi = require('joi');


const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    userGroup: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    unitNo: joi.number()
});


module.exports = {userSchema}