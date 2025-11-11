const express = require("express");
const router = express.Router();
const {  login, logout, register, verifyOtp, resendOtp, refresh} = require("../controllers/authController");


// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);


module.exports = router;
