const { checkout } = require("../services/order.service");

module.exports = {

    checkoutController: async (req, res, next) => {

        try {

            const userId = req.user.userId;

            // Get address from request body
            const { address } = req.body;

            const order = await checkout(
                userId,
                address
            );

            return res.status(order.status).json({
                message: order.message,
                order: order.order
            });

        } catch (error) {
            return next(error);
        }
    }
};

