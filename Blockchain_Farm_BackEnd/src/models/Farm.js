const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema({
  farmCode: { type: String, required: true, unique: true,index: true },
  images: [{ type: String }],
  txHash: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Farm", farmSchema);
