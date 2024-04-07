
const express = require("express")
const router = express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const orderController = require("../controllers/orderController");

router.get("/",orderController.getAllOrders)
router.get("/basket",verifyJWT,orderController.getBasket)
router.get("/history",verifyJWT,orderController.getOrderByIdUser)
router.get("/:id",orderController.getOrderById)

router.post("/",verifyJWT,orderController.createNewOrder)
router.delete("/:id",verifyJWT,orderController.deleteOrder)
router.put("/",verifyJWT,orderController.updateOrder)
router.put("/paid",verifyJWT,orderController.updatePaidOrder)
router.post("/addProduct",verifyJWT,orderController.addProduct)
router.put("/removeProduct",verifyJWT,orderController.removeProduct)

module.exports = router