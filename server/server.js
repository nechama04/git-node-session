require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const verifyJWT = require("./middleware/verifyJWT")
const PORT=process.env.PORT||1000
const app=express()




connectDB()
app.use(cors(corsOptions))
app.use(express.json())
app.use("/api/user",require("./route/userRoute"))
app.use("/api/product",require("./route/productRoute"))
app.use("/api/order",require("./route/orderRoute"))
app.use("/api/auth",require("./route/authRoute"))

app.use(express.static("public"))
app.use(verifyJWT)

app.get("/",(req,res)=>{
    res.send("This is the home page,OK?")
})
console.log(process.env.NODE_ENV);


mongoose.connection.once('open',()=>{
    console.log("Connected to DB")

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)})
})

mongoose.connection.on('error',err=>{
    console.log(err);
})

