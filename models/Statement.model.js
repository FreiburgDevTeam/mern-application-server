const { Schema, model } = require("mongoose");

const statementSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        amount: {
            type: Number,
            min: 1,
            max: 1000000,
            required: [true, "Amount is required"],
        },
        description: String,
        type: {
            type: String,
            enum: ["income", "expense"],
            required: [true, "Type is required"],
        },
        regularity: {
            type: String,
            enum: ["once", "monthly"],
            required: [true, "Regularity is required"],
            default: "once"
        },
        startDate: {
            type: Date,
            default: Date.now,
            required: [true, "Start date is required"],
        },
        category: {
            type: String,
            enum: ["Job", "Travel", "Investments", "Hobby", "Sport", "Entertaiment", "Food", "Health", "Transport", "Others"],
            default: "Others"
        },

    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

module.exports = model("Statement", statementSchema);