
const express = require("express")
const router = express.Router()
const protectRoute = require("../middlewares/protectRoute")
const {sendMessage, getMessages, getConversations} = require("../controllers/messageController")

router.get("/conversation", protectRoute, getConversations)
router.post("/", protectRoute , sendMessage)
router.get("/:otherUserId", protectRoute, getMessages) 


module.exports =  router