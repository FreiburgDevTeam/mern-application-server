const router = require("express").Router();
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");




router.get('/profile', isAuthenticated, (req, res, next) => {
    User.findOne(req.payload)
      .then( userInfo => {
          res.json(userInfo)
      })
      .catch( err => {
        console.log("Error getting user Profile", err);
        next(err)
      }) 
    });

    module.exports = router;