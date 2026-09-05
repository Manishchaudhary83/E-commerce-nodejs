const express = require("express")
const {createProductController, getAllProductsController} = require("../controllers/product.controller")
const authMiddleware = require("../middlewares/auth.middleware")


const router = express.Router()


router.post("/create", authMiddleware, createProductController)
router.get('/', authMiddleware, getAllProductsController)


module.exports = router