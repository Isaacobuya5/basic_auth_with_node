const express = require('express');
const { checkAuth, auth } = require('../middleware/auth');

const { registerUser, loginUser } = require("../controller/User");

const router = express.Router();

// creating a new user
router.post("/register",checkAuth, registerUser);
router.post("/login",auth, loginUser);

module.exports = router;