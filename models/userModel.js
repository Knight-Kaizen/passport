
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    password: String 
})
module.exports = new mongoose.model("demoUserPassport", userSchema);