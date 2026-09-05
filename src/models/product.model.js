const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        img: {
            type: String,
            default: ""
        },

        categories: {
            type: String,
            required: true
        },

        stock: {
            type: Number,
            required: true,
            min: 0
        },

        active: {
            type: Boolean,
            default: true
        },

        size: {
            type: String,
            default: ""
        },

        color: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

const productModel = mongoose.model("Products", productSchema);
module.exports = productModel