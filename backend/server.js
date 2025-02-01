import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./Dev_Champs/backend/config/mongodb.js"
import connectCloudinary from "./Dev_Champs/backend/config/cloudinary.js"
import userRouter from "./Dev_Champs/backend/routes/userRoute.js"
import doctorRouter from "./Dev_Champs/backend/routes/doctorRoute.js"
import adminRouter from "./Dev_Champs/backend/routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))