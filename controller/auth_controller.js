const UserModel = require('../Models/user')
const { userSchema } = require('../validation/joi')
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
    // check if the req data is valid
    const { error } = await userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, msg: error.details[0].message });
    }

    // check if the user already exists!
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({success:false,msg:"user already exists!"})
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const newUser = await UserModel({...req.body, password: hashedPassword});
        const savedUser = await newUser.save();
        return res.status(200).json({success:true,user: savedUser})
    } catch (error) {
        return res.json(error.message);
    }
}


module.exports = {createUser}