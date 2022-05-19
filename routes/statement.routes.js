const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Statement = require("../models/Statement.model");

// Create new Statement
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

// Get list of statements
router.get("/", (req, res, next) => {
    Statement.find()
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of statements", err);
            res.status(500).json({
                message: "error getting list of statements",
                error: err
            });
        })
});

//  Get details of a specific statement by id
router.get('/:statementId', (req, res, next) => {
    
    const { statementId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(statementId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Statement.findById(statementId)
        .then(statement => res.json(statement))
        .catch(err => {
            console.log("error getting details of a project", err);
            res.status(500).json({
                message: "error getting details of a project",
                error: err
            });
        })
});

module.exports = router;