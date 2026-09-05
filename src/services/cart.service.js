const cartModel = require("../models/cart.model")

module.exports = {
    addToCart : (userId, productId, quantity) => {
        return new Promise (async (resolve, reject) => {
            try{
                const cart = await cartModel.findOne({userId})
                
                const newcart = await cartModel.create({
                    userId,
                    products: [ { productId, quantity }]
                })

                return resolve ({
                     message: "Product added to cart successfully", 
                     status: 201,
                     cart: newcart
                    });
              
            }
            catch(error){
                return reject(error)
            }
        })

    }
}