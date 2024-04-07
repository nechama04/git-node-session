const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    describtion: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    
    image:{
        type: String,
    },
    search: {
        type: [String]
    },
    imageArr: {
        type: [String]
    },


},
    {
        timestamps: true
    })
module.exports = mongoose.model('Product', productSchema)


