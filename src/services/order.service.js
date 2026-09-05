const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");

module.exports = {

    checkout: async (userId, address) => {

        try {

            // Find user's cart
            const cart = await cartModel.findOne({ userId });

            if (!cart || cart.products.length === 0) {
                throw {
                    message: "Cart is empty",
                    status: 400
                };
            }

            const orderProducts = [];
            let amount = 0;


            // Check every product in cart
            for (const item of cart.products) {

                const product = await productModel.findById(item.productId);


                // Check product exists
                if (!product) {
                    throw {
                        message: "Product not found",
                        status: 404
                    };
                }


                // Check stock
                if (product.stock < item.quantity) {
                    throw {
                        message: `Not enough stock for ${product.title}`,
                        status: 400
                    };
                }


                // Save product information in order
                orderProducts.push({
                    productId: product._id,
                    quantity: item.quantity,
                    price: product.price
                });


                // Calculate total amount
                amount += product.price * item.quantity;


                // Decrease stock
                product.stock -= item.quantity;

                await product.save();
            }


            // Create order
            const order = await orderModel.create({
                userId,
                products: orderProducts,
                amount,
                address,
                status: "pending"
            });


            // Delete cart after checkout
            await cartModel.deleteOne({ userId });


            return {
                message: "Order created successfully",
                status: 201,
                order:order
            };

        }
        catch (error) {
            throw error;
        }
    }
};

