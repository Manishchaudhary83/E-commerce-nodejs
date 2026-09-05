const {addToCart} = require("../services/cart.service")

module.exports={
    addToCartController : async (req, res, next) => {

        try{
            const userId = req.user.userId;
            const { productId, quantity } = req.body;

            const cart = await addToCart(userId, productId, quantity)

            return res.status(cart.status).json({
                 message: cart.message, 
                 cart: cart.cart
                });

        }
        catch(error){
            return next (error)
        }
    }
}