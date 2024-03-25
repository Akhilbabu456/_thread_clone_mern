const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateToken(newUser._id, res);
      res.status(201).json({
        success: "User created successfully",
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ error: "Invalid user data received" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in signupUser", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in loginUser", err.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", { maxAge: 1 });
    res.status(200).json({ success: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in logoutUser", err.message);
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    }

    if (!userToModify || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ success: "User unfollowed" });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ success: "User followed" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in followUnFollowUser", err.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, profilePic, bio } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (req.params.id !== userId.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot update other users profile" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    res.status(200).json({ success: "User updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUser", err.message);
  }
};

const getUserProfile = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile", err.message);
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
};
