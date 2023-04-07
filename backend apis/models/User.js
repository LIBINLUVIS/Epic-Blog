const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    profilepic:{
        type:String
    },
    
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel