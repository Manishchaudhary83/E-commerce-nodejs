const productModel = require("../models/product.model")

//
module.exports =
{
    createproduct: (data, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { title, description, img, categories, stock, active, size, color, price } = data

                const product = await productModel.create({
                    sellerId: userId,
                    title,
                    description,
                    img,
                    categories,
                    stock,
                    active,
                    size,
                    color,
                    price
                })
                return resolve({
                    message: "product created successfully",
                    status: 201,
                    product: {
                        sellerId: product.sellerId,
                        title: product.title,
                        description: product.description,
                        img: product.image,
                        categories: product.categories,
                        stock: product.stock,
                        active: product.active,
                        size: product.size,
                        color: product.color,
                        price: product.price

                    }

                })

            }
            catch (error) {
                return reject(error)
            }
        })
    },

    //getall products
    getAllproducts: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const products = await productModel.find({ active: true })
                    .populate("sellerId", "username fullName");

                return resolve({
                    message: "Products fetched successfully",
                    status: 200,
                    products: products
                })
            }
            catch (error) {
                return reject(error)
            }
        })
    }


}