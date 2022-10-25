const express = require("express")
const fetchUser = require("../middleware/fetchUser")
const commentmodel = require("../models/Comments")
const usermodel = require("../models/User")
const axios = require('axios').default
const router = express.Router()

//fetch all comments sorted in descending order
router.get("/fetchComments/:id", async (req, res) => {
    try {

        const postid = req.params.id

        const comments = await commentmodel.find({ postid }).sort({ 'timestamp': -1 })

        if (!comments) return res.status(400).json({ msg: "no comments for this post" })
        return res.json(comments)

    } catch (e) { res.status(500) }
})


//post commment after passing through NLP model
router.post("/postComment/:id", fetchUser, async (req, res) => {
    try {

        const postid = req.params.id
        const userid = req.id

        const { comment } = req.body

        const  safe = await axios.post(
            'http://20.97.134.74/',
            {
                body: JSON.stringify({comment}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if(safe.data.msg==="Negative") return res.json({msg:"Negative comment",id:"0"})
        const user = await usermodel.findById(userid)
        if (!user) return res.json({ msg: "user not found" })
        const completed = await commentmodel.create({
            postid, username: user.username, comment
        })

        if (!completed) return res.status(400).json({ msg: "comment could not be posted" })

        return res.json({ msg: "Positive Comment",id:"1" })

    } catch (e) { res.status(500) }
})

//update existing comments
router.put("/updateComment/:commentid", fetchUser, async (req, res) => {
    try {

        const commentid = req.params.commentid
        const userid = req.id
        const { comment } = req.body

        const foundComment = await commentmodel.findById(commentid)
        const user = await usermodel.findById(userid)

        if (foundComment.username != user.username) return res.status(401).json({ msg: "illegal operation" })

        const  safe = await axios.post(
            'http://localhost:7000/',
            {
                body: JSON.stringify({comment}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if(safe.data.msg==="Negative") return res.json({msg:"Negative comment"})
    
        
        const updated = await commentmodel.findByIdAndUpdate(commentid, {
            comment,timestamp:Date.now()
        })

        if (!updated) return res.status(400).json({ msg: "comment could not be updated" })

        res.json({ msg: "Comment Updated!" })

    } catch (e) { res.status(500) }
})

router.delete("/deleteComment/:commentid", fetchUser, async (req, res) => {
    try {

        const userid = req.id
        const commentid = req.params.commentid
        
        const user = await usermodel.findById(userid)
        const foundComment = await commentmodel.findById(commentid)
        
        
        if (foundComment.username != user.username) return res.status(401).json({ msg: "illegal operation" })

        const deleted = await commentmodel.findByIdAndDelete(commentid)

        if (!deleted) return res.status(500).json({ msg: "could not delete comment" })

        res.json({ msg: "Comment Deleted!" })

    } catch (e) { res.status(500) }
})


module.exports = router