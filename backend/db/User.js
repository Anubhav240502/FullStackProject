const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    fname:String,
    lname:String,
    mail:String,
    phno:Number,
    pword:String,
   
});

module.exports = mongoose.model('users',userSchema);