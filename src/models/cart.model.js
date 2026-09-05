const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            unique: true
        },

        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                    required: true
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ]
    },
    {
        timestamps: true
    }
);
const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel