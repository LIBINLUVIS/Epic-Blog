const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    

    username: {
        type: String,
        required: true
    },


    postimg: {
        type: String,
    },

    userid:{
       type:String
    },


    title: {
        type: String,
    },

    topic:{
        type:String,
        default:"general"
    },

    description: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    }

})

const postmodel = mongoose.model("posts", postSchema)

module.exports = postmodel