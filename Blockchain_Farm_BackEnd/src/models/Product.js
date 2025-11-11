const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productCode: { type: String, required: true, unique: true },
  farmCode: { type: String, required: true },
  images: [{ type: String }], 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  txHash: String, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
