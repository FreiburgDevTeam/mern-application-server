const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Statement = require("../models/Statement.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

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
            console.log("error getting details of a statement", err);
            res.status(500).json({
                message: "error getting details of a statement",
                error: err
            });
        })
});

// Updates a specific statement by id
router.put('/:statementId', isAuthenticated, (req, res, next) => {
    const { statementId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(statementId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Statement.findByIdAndUpdate(statementId, req.body, { new: true })
        .then((updatedStatement) => res.json(updatedStatement))
        .catch(err => {
            console.log("error updating statement", err);
            res.status(500).json({
                message: "error updating statement",
                error: err
            });
        })
});

// Delete a specific statement by id
router.delete('/:statementId', (req, res, next) => {
    const { statementId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(statementId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Statement.findByIdAndRemove(statementId)
        .then(() => res.json({ message: `Statement with id ${statementId} removed successfully.` }))
        .catch(err => {
            console.log("error deleting statement", err);
            res.status(500).json({
                message: "error deleting statement",
                error: err
            });
        })
});

module.exports = router;