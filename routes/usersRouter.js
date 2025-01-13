const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const {registerUser, loginUser, logoutUser} = require('../controllers/authController')

const userModel = require('../models/user-model')
router.use( cookieParser() );

router.get("/", (req,res)=>{
    res.send("HI Users");
})

router.post("/register", registerUser )

router.post("/login", loginUser)

router.get('/logout', logoutUser)
module.exports = router;

