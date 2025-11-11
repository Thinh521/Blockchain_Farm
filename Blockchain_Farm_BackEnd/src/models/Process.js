const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  stepName: { type: String, required: true },
  txHash: { type: String, default: null },
});

const processSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    steps: [stepSchema,],
      imageUrls: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Process", processSchema);
