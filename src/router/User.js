const express = require('express');
const auth = require('../middleware/auth');

const { registerUser, loginUser } = require("../controller/User");

const router = express.Router();

// creating a new user
router.post("/register", registerUser);
router.post("/login",auth, loginUser);

module.exports = router;