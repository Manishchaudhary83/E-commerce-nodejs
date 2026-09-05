const express = require("express");

const {checkoutController} = require("../controllers/order.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Checkout / Create Order
router.post("/checkout", authMiddleware, checkoutController);

module.exports = router;
