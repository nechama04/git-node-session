const Product = require("../models/Product")

const createNewProduct = async (req, res) => {
    console.log(req.user);
    // if (req.user.roles != "manager")
    //     return res.status(401).json({ message: 'Unauthorized' })

    const { name, code, describtion, price, search ,image,imageArr} = req.body
    console.log(req.user)
    if (!name) {
        return res.status(400).json({ message: "name is required" })
    }
    // if (!user) {
    //     return res.status(400).json({ message: "name is required" })
    // }
    const product = await Product.create({ name, code, describtion, price, search,image ,imageArr})
    if (product) {
        return res.status(201).json({ message: "new product created" })
    }
    else {
        return res.status(400).json({ message: "invalid product" })
    }
}

const getAllProducts = async (req, res) => {

    const products = await Product.find()
    
    res.json(products)
}


const getProductById = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: "no product found" })
    }
    const product = await Product.findById(id).exec()
    res.json(product)
}



const updateProduct = async (req, res) => {

    //just manager can do!!
    // if (req.user.roles != "manager")
    // return res.status(401).json({ message: 'Unauthorized' })

    const { _id, name, code, describtion, price, search ,image,imageArr} = req.body
    if (!_id || !name)
        return res.status(400).json({ message: "fields are required" })
    const product = await Product.findById(_id).exec()
    if (!product) {
        return res.status(400).json({ message: "product not found" })
    }

    product.name = name
    product.code = code
    product.describtion = describtion
    product.price = price
    product.search = search
    product.image=image
    product.imageArr=imageArr

    const updatedProduct = await product.save()

    res.json(`${updatedProduct.name} update`)
}


const deleteProduct = async (req, res) => {

    if (req.user.roles != "manager")
    return res.status(401).json({ message: 'Unauthorized' })

    const { id } = req.body
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: "product not found" })
    }

    const result = await Product.deleteOne(product)

    const reply = `product  ${result.id}  deleted`
    res.json(reply)
}



module.exports = { getAllProducts, createNewProduct, getProductById, updateProduct, deleteProduct }  


