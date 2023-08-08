const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const user = new Schema({
    user_name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model("user_model",user);