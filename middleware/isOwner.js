const { default: mongoose } = require("mongoose");
const Statement = require("../models/Statement.model");

module.exports = (req, res, next) => {
  const { statementId } = req.params;
  Statement.findById(statementId)
  .populate("user")
  .then(statementDetails => {
    if (statementDetails.user.id !== req.payload._id){
        console.log("User not authorized to perform this operation", err);
        return res.status(500).json({ message: "User not authorized to perform this operation"});  
    }
    next(); 
  })
};
