require("dotenv").config()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const login = async (req, res) => {
    const { userName, password } = req.body

    //required fields
    if (!userName || !password) {
        return res.status(400).json({ message: "all fields are required" })
    }

    //Unauthorized fields
    const foundUser = await User.findOne({ userName }).lean()
    if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    //match password
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
        return res.status(401).json({ message: "Unauthorized" })
    }


    const userInfo = { _id: foundUser._id, name: foundUser.name, roles: foundUser.roles, userName: foundUser.userName, email: foundUser.email, phone: foundUser.phone, address: foundUser.address }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    return res.json({accessToken})

}


const register = async (req, res) => {

    const { userName, password, name, email, phone, address } = req.body
    
    //required fileds
    if (!userName || !password) return res.status(400).json({ message: 'userName and password is required' })

    //duplicate userName
    const duplicate = await User.findOne({ userName: userName }).lean()
    // if (duplicate) return res.status(409).json({ message: "userName must be unique" })
    if(duplicate)
       { return res.status(409).json({message: 'duplicate User'})}

    //username in lower case
    if (userName.toLowerCase() != userName) return res.status(400).send("userName must be lowercase!")

    //create password and object
    const hashedPwd = await bcrypt.hash(password, 10)

    //user create
    const user = await User.create({ name, email, userName, phone, address, password: hashedPwd })
    if (user) return res.json({userName:user.userName, id:user._id, name:user.name})
    else return res.status(400).json({ message: "invalid user received" })
}

module.exports = { login, register }