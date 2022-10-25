const mongoose = require("mongoose")

// const mongoURI = "mongodb://localhost:27017/blog"
const mongoURI="mongodb+srv://libin123:mongodb123@blogy.ctx3wnb.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to Blog Database")
    })
}

module.exports = connectToMongo