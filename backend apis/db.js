const mongoose = require("mongoose")

const mongoURI = "mongodb://localhost:27017/blog"


const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to Blog Database")
    })
}

module.exports = connectToMongo
