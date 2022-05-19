const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Statement = require("../models/Statement.model");

//Create new Statement
router.post('/', (req, res, next) => {
    const { title, amount, description, type, regularity, startDate, category } = req.body;
    const newStatement = { title, amount, description, type, regularity, startDate, category }

    Statement.create(newStatement)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            console.log("error creating a new statement", err);
            res.status(500).json({
                message: "error creating a new statement",
                error: err
            });
        })
})

module.exports = router;