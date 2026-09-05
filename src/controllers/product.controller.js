const { createproduct, getAllproducts, updateProduct, deleteProduct } = require("../services/product.service")

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
        },
//update products
updateProductController: async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const { id } = req.params;
        const data = req.body;

        const product = await updateProduct(
            id,
            userId,
            data
        );

        return res.status(product.status).json({
            message: product.message,
            product: product.product
        });

    } catch (error) {
        return next(error);
    }
},


//delete products
deleteProductController: async (req, res, next) => {
    try {

        const userId = req.user.userId;
        const { id } = req.params;

        const product = await deleteProduct(
            id,
            userId
        );

        return res.status(product.status).json({
            message: product.message
        });

    } catch (error) {
        return next(error);
    }
}



}