const express = require("express")
const {createProductController, getAllProductsController, updateProductController, deleteProductController} = require("../controllers/product.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const upload = require("../middlewares/multer.middleware")


const router = express.Router()


router.post("/create", authMiddleware, upload.array("images", 5), createProductController)
router.get('/', authMiddleware, getAllProductsController)
router.patch('/update/:id', authMiddleware, updateProductController)
router.delete('/delete/:id', authMiddleware, deleteProductController)


module.exports = router