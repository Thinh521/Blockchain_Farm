const Process = require("../models/Process");
const errors = require("../constants/errorCodes");
const { cloudinary } = require("../config/cloudinary");

const validSteps = [
  "planting",
  "spraying",
  "fertilizing",
  "harvesting",
  "transportation",
];

// Update step
exports.updateProcessStep = async (req, res) => {
  try {
    const { productCode, stepName, txHash } = req.body;

    if (!productCode || !stepName) {
      return res.status(400).json(errors.PROCESS.MISSING_PARAMS);
    }

    if (!validSteps.includes(stepName)) {
      return res.status(400).json(errors.PROCESS.INVALID_STEP);
    }

    let process = await Process.findOne({ productCode });

    if (!process) {
      // nếu chưa có thì tạo mới với đủ 5 bước
      process = new Process({
        productCode,
        steps: validSteps.map((step) => ({ stepName: step, txHash: null })),
      });
    }

    // cập nhật đúng step
    process.steps = process.steps.map((s) =>
      s.stepName === stepName ? { ...s.toObject(), txHash } : s
    );

    await process.save();

    res.status(200).json({
      ...errors.COMMON.SERVER_SUCCESS,
      process,
    });
  } catch (error) {
    console.error("updateProcessStep error:", error);
    res.status(500).json(errors.COMMON.SERVER_ERROR);
  }
};

// Get all steps by productCode
exports.getProcessByProduct = async (req, res) => {
  try {
    const { productCode } = req.params;
    const process = await Process.findOne({ productCode });

    if (!process) {
      return res.status(404).json(errors.PROCESS.NOT_FOUND);
    }

    res.status(200).json({
      ...errors.COMMON.SERVER_SUCCESS,
      process,
    });
  } catch (error) {
    console.error("getProcessByProduct error:", error);
    res.status(500).json(errors.COMMON.SERVER_ERROR);
  }
};

// Upload image for a specific process step
exports.uploadProcessStepImage = async (req, res) => {
    console.log("📦 req.files:", req.files);
    console.log("📦 req.body:", req.body);
  try {
    const { productCode, stepName } = req.body;

    // Kiểm tra tham số đầu vào
    if (!productCode || !stepName) {
      return res.status(400).json(errors.PROCESS.MISSING_PARAMS);
    }

    if (!validSteps.includes(stepName)) {
      return res.status(400).json(errors.PROCESS.INVALID_STEP);
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        ...errors.PROCESS.MISSING_PARAMS,
        message: "Không có ảnh nào được tải lên",
      });
    }

    // Tìm hoặc tạo mới process
    let process = await Process.findOne({ productCode });
    if (!process) {
      process = new Process({
        productCode,
        steps: validSteps.map((step) => ({
          stepName: step,
          imageUrl: [String],
        })),
      });
    }

    // Upload từng ảnh lên Cloudinary
    const uploadedImages = [];
   
    for (const file of req.files) {
      const base64String = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;

      const img = await cloudinary.uploader.upload(base64String, {
        timeout: 120000,
      });

      uploadedImages.push(img.secure_url);
    }

    // Cập nhật đúng step với link ảnh
    process.steps = process.steps.map((s) =>
      s.stepName === stepName
        ? { ...s.toObject(), imageUrl: uploadedImages[0] } // lấy ảnh đầu tiên
        : s
    );

    await process.save();

    res.status(200).json({
      ...errors.COMMON.SERVER_SUCCESS,
      imageUrl: uploadedImages,
      process,
    });
  } catch (error) {
    console.error("uploadProcessStepImage error:", error);
    res.status(500).json(errors.COMMON.SERVER_ERROR);
  }
};
