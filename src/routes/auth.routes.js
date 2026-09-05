const express = require("express")
const { registerUserController, loginUserController } = require("../controllers/auth.controller")
const {registerUserValidationRules} = require("../middlewares/validate.middleware")

const router = express. Router()


router.post("/register", registerUserValidationRules, registerUserController)
router.post("/login", loginUserController)

module.exports = router