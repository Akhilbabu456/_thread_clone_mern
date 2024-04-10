const express = require("express")
const {signupUser, loginUser, logoutUser, followUnFollowUser, updateUser, getUserProfile, getSuggestedUsers, freezeAccount} = require("../controllers/userController")
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router()

router.get("/profile/:query", getUserProfile)
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/follow/:id", protectRoute , followUnFollowUser)
router.put("/update/:id", protectRoute , updateUser)
router.put("/freeze", protectRoute, freezeAccount);

module.exports = router