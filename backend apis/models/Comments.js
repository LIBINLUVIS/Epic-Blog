const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    
    postid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"posts"
    },

    username:{
        type:String,
        required:true 
    },
    comment:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const commentmodel = mongoose.model("comments",commentSchema)

module.exports = commentmodel