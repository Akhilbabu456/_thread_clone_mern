const express = require("express")
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const connectDB = require("./db/connectDB")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")
const messageRoutes = require("./routes/messageRoutes")
const cloudinary = require('cloudinary').v2;



dotenv.config()
connectDB()
const app = express()

const PORT = process.env.PORT || 5000
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`))