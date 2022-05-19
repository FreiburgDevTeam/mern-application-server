const { Schema, model } = require("mongoose");

const statementSchema = new Schema(
    {
        title: {
            type: String,
            required: [True, "Title is required"],
        },
        amout: {
            type: Number,
            min: 1,
            max: 1000000,
            required: [True, "Amount is required"],
        },
        description: String,
        type: {
            type: String,
            enum: ["income", "expense"],
            required: [True, "Type is required"],
        },
        regularity: {
            type: String,
            enum: ["once", "monthly"],
            required: [True, "Regularity is required"],
            default: "once"
        },
        startDate: {
            type: Date,
            default: Date.now,
            required: [True, "Start date is required"],
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

const Statement = model("Statement", statementSchema);

module.exports = User;
