const bcrypt = require('bcrypt');
const userDetailCollection = require('../models/userModel');


//register user 
const createUser = async(req, res)=>{
    try{
        const {name, email, mobile, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userDetailCollection({
            name,
            email, 
            mobile,
            password: hashedPassword
        })
        const result = await newUser.save();
        res.send({success: true, data: 'user created successfully'});
    }
    catch(err){
        console.log('error in createUser', err);
        res.send({success: false, data: err});
    }
}

// get all the users 
const getUsers = async(req, res)=>{
    try{
        const result = await userDetailCollection.find();
        res.send({success: true, data: result});
    }
    catch(err){
        console.log('error in getUsers', err);
        res.send({success: false, data: err});
    }
}

// login user 
const loginUser = async(req, res)=>{
    try{
        res.send({success: true, data: 'user loggedIn successfully'});
    }
    catch(err){
        console.log('error in loginUser', err);
        res.send({success: false, data: err});
    }
}


module.exports = {
    createUser,
    getUsers,
    loginUser 
}