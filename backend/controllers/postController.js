const Post = require("../models/postModel");
const User = require("../models/userModel");
const cloudinary = require('cloudinary').v2;

const createPost = async (req, res) => {
    const {postedBy, text} = req.body
    let {img} = req.body
try {
    if(!postedBy || !text){
        return res.status(400).json({error: "postedBy and text fields are required"})
    }

    const user = await User.findById(postedBy)

    if(!user){
        return res.status(400).json({error: "User not found"})
    }
     
    if(user._id.toString() !== req.user._id.toString()){
        return res.status(401).json({error: "User not authorized to create post"})
    }

    const maxLength = 500
    if(text.length > maxLength){
        return res.status(400).json({error: `Text length should be less than ${maxLength} characters`})
    }

    if(img){
        const uploadedResponse = await cloudinary.uploader.upload(img)
        img = uploadedResponse.secure_url
    }

    const newPost = new Post({postedBy, text, img}) 

    await newPost.save()
    res.status(201).json({message: "Post created successfully", newPost})
        
} catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in createPost", err.message);
}
}

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post){
            return res.status(404).json({error: "Post not found"})
        }

        res.status(200).json({ post})
    } catch (err) {
        res.status(500).json({ error: err.message });
    console.log("Error in getPosts", err.message);
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
    if(!post){
            return res.status(404).json({error: "Post not found"})
    }

    if(post.postedBy.toString() !== req.user._id.toString()){
        return res.status(401).json({error: "User not authorized to delete post"})
    }

    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({message: "Post deleted successfully"})

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in deletePost", err.message);
    }
}

const likeUnlikePost = async(req,res)=>{
    const postId = req.params.id;
    const userId = req.user._id;
    try {
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({error: "Post not found"})
        }

        const userLikedPost = post.likes.includes(userId)
        
        if(userLikedPost){
           await Post.updateOne({_id: postId}, {$pull: {likes: userId}})
           res.status(200).json({message: "Post unliked successfully"})
        }else{
           await Post.updateOne({_id: postId}, {$push: {likes: userId}})
           res.status(200).json({message: "Post liked successfully"})
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in likeUnlikePost", err.message);
    }
}

const replyToPost = async(req,res)=>{
    const {text} = req.body
    const postId = req.params.id
    const userId = req.user._id
    const userProfilePic = req.user.profilePic
    const username = req.user.username
    try {
        if(!text){
            return res.status(400).json({error: "Please enter text"})
        }

        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({error: "Post not found"})
        }

        const reply = {userId, text, userProfilePic, username}
        post.replies.push(reply)
        await post.save()

        res.status(200).json({message: "Reply added successfully", post})

        
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in replyToPost", err.message);
    }
}

const getFeedPost = async(req,res)=>{
    const userId = req.user._id
    
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        const following = user.following 

        const feedPosts = await Post.find({postedBy: {$in: following}}).sort({createdAt: -1})
        res.status(200).json(feedPosts)

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in getFeedPost", err.message);
    }
}

module.exports = { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPost}