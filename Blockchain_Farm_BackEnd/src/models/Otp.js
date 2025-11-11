// models/Otp.js
const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  type: {
    type: String,
    enum: ["register", "updateEmail", "resetPassword"],
    required: true,
  },

  expiresAt: { type: Date, required: true, index: { expires: 0 } }, 
});

module.exports = mongoose.model("Otp", OtpSchema);
