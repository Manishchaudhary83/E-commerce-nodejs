const express = require("express");
const {addToCartController} = require("../controllers/cart.controller")
const authMiddleware = require("../middlewares/auth.middleware")


const router = express.Router();


router.post("/add", authMiddleware, addToCartController)



module.exports = router;