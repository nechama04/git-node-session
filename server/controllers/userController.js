const User = require("../models/User")

const createNewUser = async (req, res) => {

    //just manager
    // if (req.user.roles != "manager")
    //     return res.status(401).json({ message: 'Unauthorized' })

    const { userName, password, name, email, phone, roles, address } = req.body
    if (!userName || !password) {
        return res.status(400).json({ message: 'userName and password is required' })
    }
    const UserNameArr = (await User.find().lean()).map(e => { e.userName })
    if (UserNameArr.includes(userName))
        return res.status(201).json("userName must be unique");
    if (email?.toLowerCase() != email) return res.status(400).send("email must be lowercase!")
    const checkUser = await User.find().map(use => use.userName)
    if (checkUser.includes(userName)) return res.status(400).send("userName is invalid!!")
    if (userName.toLowerCase() != userName) return res.status(400).send("userName must be lowercase!")
    const user = await User.create({ userName, password, name, email, phone, roles, address })
    return res.json(user)
}
const getAllUsers = async (req, res) => {
    //just manager
    // if (req.user.roles != "manager")
    //     return res.status(401).json({ message: 'Unauthorized' })

    const users = await User.find({}, { password: 0 }).lean()
    // const users = await User.find().lean()
    if (!users?.length) {
        return res.status(400).json({ message: "no user found" })
    }
    res.json(users)
}

const getUserById = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "no user found" })
    }
    const user = await User.find({ _id: id }, { password: 0 })
    res.json(user)
}

const updateUser = async (req, res) => {
    const { _id, userName, name, email, phone, roles, address } = req.body
        if (!_id || !name) {
            // return res.status(400).json({message:"fields required"})
            return res.json({ message: "user not found" })
        }
        const user = await User.findById(_id).exec()
        if (!user) {
            return res.json({ message: "user not found" })
            // return res.status(400).json({message:"users not found"})
        }
    user.userName = userName 
    user.name = name
    user.email = email
    user.phone = phone
    user.roles = roles
    user.address = address 

    const updatedUser = await user.save()
    res.json(`${updatedUser.name} update`)

}

const deleteUser = async (req, res) => {

    //just manager
    if (req.user.roles != "manager")
        return res.status(401).json({ message: 'Unauthorized' })

    const { id } = req.body
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }

    const result = await User.deleteOne(user)

    const reply = `user  ${result.id}  deleted`
    res.json(reply)
}

module.exports = { getAllUsers, createNewUser, getUserById, updateUser, deleteUser }