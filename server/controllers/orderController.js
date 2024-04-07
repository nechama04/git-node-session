const express = require("express")
const Order = require("../models/Order")
const Product = require("../models/Product")


const getAllOrders = async (req, res) => {
    // if (req.user.role == 'manager') {
    const orders = await Order.find().populate("productsList").populate("user", { password: 0 }).lean()
    res.json(orders)
    //}
    //else {
    // const order = await Order.find({ user: req.user._id, complete: true }).populate("productsList.prod").populate("user", { password: 0 }).lean()
    // res.json(order)
    //}
}
const getBasket = async (req, res) => {
    console.log("get basket");
    const order = await Order.findOne({ user: req.user._id, paid: 0 }).lean()
    if (!order || !order.productsList)
    {
        console.log(order);
        return res.json([])
    }
        
    console.log(order);

    res.json(order)
}

const createNewOrder = async (req, res) => {
    const { paid, productsList, price } = req.body
    const order = await Order.create({ user: req.user._id, paid, productsList, price })
    res.json(order)
}

const getOrderById = async (req, res) => {
    const { _id } = req.params
    // const order = await Order.find({ _id, user: req.user._id }).populate("user", { password: 0 }).lean()
    // if (!order) {
    //     return res.status(400).json("order not found ")
    //}
   // res.json(order)
}
const getOrderByIdUser = async (req, res) => {

    const myOrders = await Order.find({ user: req.user._id, paid: 1 }).lean()
    console.log("myOrders", myOrders);
    if (!myOrders) {
        return res.json("start buy now!! ")
    }
    return res.json(myOrders)
}

const updateOrder = async (req, res) => {
    const { _id, paid, productsList, price } = req.body
    if (!_id)
        return res.status(400).json("id is required")
    const order = await Order.find({ _id, user: req.user._id }).populate("user", { password: 0 }).exec()
    if (!order)
        return res.status(400).json(" order not found")
    order.paid = paid
    order.price = price
    order.productsList = productsList
    const myUpdateOrder = await order.save()
    res.json(myUpdateOrder)
}

const updatePaidOrder = async (req, res) => {

    const { id } = req.body 
    const order=await Order.findById(id).exec()

    if(!order){
        return res.status(400).json({message:"order not found"})
    }
    order.paid=1
    const updatedOrder=await order.save()

    res.json(`${updatedOrder} update`)
}

const deleteOrder = async (req, res) => {
    const { _id } = req.params
    const order = await Order.findById(_id).populate("user", { password: 0 }).exec()
    if (!order)
        return res.status(400).json("order not found")
    const result = await order.deleteOne()
    res.json(result)

}
const addProduct = async (req, res) => {
    const user = req.user._id
    const { prod } = req.body
    if (!prod)
        return res.status(400).json("prodId is required")
    const product = await Product.findById(prod)
    const order = await Order.findOne({ user, paid: 0 })
    if (order === null) {
        const newOrder = await Order.create({ user: user, productsList: [prod], price: product.price, paid: 0 })
        const updateNewOrder = await newOrder.save()
        return res.json(updateNewOrder)
    }

    else if (order.productsList == null) {
        order.productsList = [prod]
        order.price = product.price
    }
    else {
        order.productsList = [...order.productsList, prod]
        order.price = order.price + product.price
    }
    const updateOrder = await order.save()
    return res.json(updateOrder)

}

const removeProduct = async (req, res) => {
    user = req.user._id
    const { prod } = req.body
    const product = await Product.findById(prod)
    if (!prod)
        return res.status(400).json("prod is required")
    const order = await Order.findOne({ user, paid: 0 })
    if ((order === null) || (order.productsList === null)) {
        return res.json("no order")
    }

    const index = order.productsList.indexOf(prod)
    order.productsList.splice(index, 1)
    order.price = order.price - product.price
    const updateOrder = await order.save()
    return res.json(updateOrder)

}


module.exports = {
    getAllOrders,
    createNewOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    addProduct,
    getBasket,
    removeProduct,
    getOrderByIdUser,
    updatePaidOrder
}


