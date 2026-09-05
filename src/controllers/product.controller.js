const { createproduct, getAllproducts } = require("../services/product.service")

module.exports = {
    createProductController: async (req, res, next) => {
        try {
            const data = req.body
            const userId = req.user.userId

            const product = await createproduct(
                data,
                userId
            )

            return res.status(product.status).json({
                message: "Productr created successfully",
                product: product.product
            })
        }
        catch (error) {
            return next(error)
        }
    },

//get all products
getAllProductsController: async (req, res, next) => {
    try {

        const products = await getAllproducts();

        return res.status(products.status).json({
            message: products.message,
            products: products.products
            });
            } catch (error) { 
                return next(error); 
            }
        }
}