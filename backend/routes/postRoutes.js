const express = require("express")
const { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPost } = require("../controllers/postController")
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router()

router.get("/feed", protectRoute, getFeedPost)
router.get("/:id", getPost)
router.post("/create", protectRoute, createPost)
router.delete("/:id", protectRoute, deletePost)
router.post("/like/:id", protectRoute, likeUnlikePost)
router.post("/reply/:id", protectRoute, replyToPost)

module.exports = router