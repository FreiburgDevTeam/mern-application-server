const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware")
const router = express.Router();
const saltRounds = 10;

const generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username,
    };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '6h',
    });
    return authToken;
};

// Create Account
router.post("/signup", (req, res) => {
    const { username, password, email } = req.body;
    // input validations
    if (email === '' || password === '' || username === '') {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a valid email address.' });
        return;
    }
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!passwordRegex.test(password)) {
        res.status(400).json({ message: 'Password must have at least 8 characters and contain at least one number, one lowercase and one uppercase letter.' });
        return;
    }

    // Check if a user with the same email already exists
    User.findOne({ email })
        .then((foundUser) => {
            // If the user with the same email already exists, we need to stop the promise chain
            if (foundUser) {
                const customError = new Error();
                customError.name = "userExists";
                customError.message = "User already exists.";
                throw customError; //we throw an error to break the promise chain (ie. to avoid going to the next .then() )
            }
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(password, salt);

            User.create({ username, email, password: hashedPassword })
            .then((user) => {
                const authToken = generateToken(user);
                return res.status(201).json({ authToken: authToken });
            })
        })
        
        .catch(err => {
            console.log("error creating new user... ", err);
            if(err.name === "userExists"){
                res.status(400).json({ message: err.message });
            } else {
                res.status(500).json({ message: "Internal Server Error: error creating new user" })
            }
        });
});

// Login
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;

    // Check if email or password are provided as empty string 
    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    // Check the users collection if a user with the same email exists
    User.findOne({ email })
        .then((user) => {

            if (!user) {
                // If the user is not found, send an error response
                res.status(401).json({ message: "User not found." })
                return;
            }

            // Compare the provided password with the one saved in the database
            const passwordCorrect = bcrypt.compareSync(password, user.password);

            if (passwordCorrect) {
                const authToken = generateToken(user);
                return res.status(201).json({ authToken: authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }

        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

// Verify
router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log(`req.payload`, req.payload);
    res.status(200).json(req.payload);
});

module.exports = router;