const express = require("express")
const router = express.Router()
const usermodel = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const multer = require("multer")
const fetchUser = require("../middleware/fetchUser")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profilepics")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


router.post("/signup", upload.single("image"), async (req, res) => {
    try {
        let image = null
        if (req.file) {
            image = fs.readFileSync("uploads/profilepics/" + req.file.originalname).toString('base64')
        }
        const { firstname,lastname,username, password } = req.body

        const search = await usermodel.findOne({ username })
        if (search) return res.status(400).json({ msg: "User already exists" })

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const user = await usermodel.create({
            profilepic: image, username, password: hashed,firstname,lastname
        })

        if (!user) return res.status(400).json({ msg: "User Not Created" })

        return res.json({ msg: "User created Successfully" })
    } catch (e) { res.status(500) }
})

router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body

        const search = await usermodel.findOne({ username })
        if (!search) return res.status(401).json({ token: null })

        const passmatch = await bcrypt.compare(password, search.password)
        if (!passmatch) return res.status(401).json({ token: null })

        const data = {
            id: search._id
        }

        const token = jwt.sign(data, "shhh")

        return res.json({ token })


    } catch (e) { res.status(500) }
})


router.put("/changedp", fetchUser, upload.single('image'), async (req, res) => {
    try {


        const userid = req.id

        let img = null
        if (!req.file)
            return res.status(400).json({ msg: "Image Not Found" })

        img = fs.readFileSync("uploads/profilepics/" + req.file.originalname).toString('base64')

        const updatedpic = await usermodel.findOneAndUpdate({_id:userid},{
            profilepic:img
        })

        if(!updatedpic)
            return res.status(400).json({msg:"Picture not updated"})
        return res.json({msg:"profile picture updated"})
    } catch (e) { return res.json({ msg: e }) }
})

router.put("/changepw",fetchUser,async(req,res)=>{
try{

    userid = req.id
    const {newpass} = req.body
    
    const salt= await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(newpass,salt)
    const updatedpw = await usermodel.findOneAndUpdate({_id:userid},{
        password:hashed
    })
    
    if(!updatedpw)
    return res.json("password not updated ")
    
    
    return res.json("password  updated successfully")
    
}catch(e){return res.json({msg:e})}
    
})



router.put("/changeusername",fetchUser,async(req,res)=>{

    userid = req.id
    const {username} = req.body

    const finduser = await usermodel.findOne({username})
    if(finduser)
        return res.status(400).json({msg:"Username already taken"})
    const updated = await usermodel.findOneAndUpdate({_id:userid},{
        username:username
    })

    if(!updated)
        return res.status(400).json({msg:"Username Not Updated"})
    
        
    return res.json({msg:"username updated successfully"})
})


router.get("/fetch", fetchUser, async (req, res) => {
    try {

        const user = await usermodel.findById(req.id)
        if (!user) return res.status(400).json({ msg: "user not found" })

        return res.json(user)
    } catch (e) { res.status(500) }
})

module.exports = router