const connectToMongo = require("./db")
const express = require("express")
const app = express()
const cors = require("cors")
const port = 80

connectToMongo()

app.use(cors())

app.use(express.json())

app.use("/api/auth/",require("./routes/userAuth"))

app.use("/api/posts/",require("./routes/posts"))

app.use("/api/comments/",require("./routes/comments"))



app.listen(port,()=>{
    console.log(`backend listening at port ${port}`)
})
