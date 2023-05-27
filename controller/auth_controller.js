const UserModel = require('../Models/user')
const { userSchema, loginSchema } = require('../validation/joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

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
        return res.status(200).json({success:true})
    } catch (error) {
        return res.json({success: false, msg:error.message});
    }
}

const loginUser = async (req, res) => {
    // validate user input
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({success:false, msg: error.details[0].message})
    }

    // check if the user exists!
    const isUser = await UserModel.findOne({ email: req.body.email });
    if (!isUser) {
        return res.status(401).json({ success: false, msg: 'User does not exists!' });
    }
    
    // check if the password matches
    const isValidPass = await bcrypt.compare(req.body.password, isUser.password);
    if (!isValidPass) {
        return res.status(401).json({ success: false, msg: 'Check your email/password credentials!' });
    }

    // Sign a jwt token
    const token = await jwt.sign({ id: isUser._id }, process.env.SECRET);
    
    return res.status(200).json({ success: true, msg: 'Logged In', auth_token: token, user:{id:isUser._id, firstName: isUser.firstName, lastName: isUser.lastName, userGroup: isUser.userGroup} });
}


module.exports = {createUser, loginUser}