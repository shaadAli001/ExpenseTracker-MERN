const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Transaction Id is Required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is Required"],
    },
    type: {
        type: String,
        required: [true, "Type is required"],
    },
    category: {
        type: String,
        required: [true, "Category is Required"],
    },
    refrence: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Description is Required"],
    },
    date: {
        type: Date,
        required: [true, "Data is required"],
    },
}, { timestamps: true })

const transactionModel = mongoose.model("transactions", transactionSchema);
module.exports = transactionModel;