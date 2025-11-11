// models/Login.js
const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  refreshToken: [{ type: String }],
  loginTime: { type: Date, default: Date.now },
  ip: String,
  device: String,
  expiredAt: { type: Date }
});


module.exports = mongoose.model("Login", LoginSchema);
