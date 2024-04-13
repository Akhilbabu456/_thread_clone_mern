const express = require("express")

const cors = require("cors")	
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const connectDB = require("./db/connectDB.js")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes.js")
const postRoutes = require("./routes/postRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")
const cloudinary = require('cloudinary').v2;
const {app,server} = require("./socket/socket.js")


dotenv.config()
connectDB()


const PORT = process.env.PORT || 5000

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cors({
    origin: true,
  }));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/message", messageRoutes)



server.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`))
