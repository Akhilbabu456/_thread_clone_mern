const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./db/connectDB")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes")
const postRoutes = require("./routes/postRoutes")


dotenv.config()
connectDB()
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`))