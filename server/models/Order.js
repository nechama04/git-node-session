const mongoose = require("mongoose")
const user = require("./User")
const {format} = require("date-fns")
const product = require("./Product")

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:user
    },
    orderDate: {
        type: Date,
        default:format(new Date(),"yyyy-MM-dd\tHH:mm:ss")
    },
    paid: {
        type: Number,
        default: 0
    }, 
    price:{
        type: Number,
        default: 0
    },
    productsList:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:product
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Order', orderSchema)


