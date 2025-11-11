const { cloudinary } = require("../config/cloudinary");
const Farm = require("../models/Farm");
const Product = require("../models/Product");
const errorCodes = require("../constants/errorCodes");

// Tạo farm
const create = async (req, res) => {
  
  try {
    const { farmCode } = req.body;
    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const base64String = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        const img = await cloudinary.uploader.upload(base64String, {
          timeout: 120000,
        });

        images.push(img.secure_url);
      }
    } else {
      return res.status(400).json({ code: errorCodes.PROCESS.MISSING_PARAMS.code });
    }

    const newFarm = new Farm({ farmCode, images });
    await newFarm.save();

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      images,
    });
  } catch (error) {
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};

// Cập nhật txHash
const updateFarmTxHash = async (req, res) => {
  try {
    const { farmCode, txHash } = req.body;

    const farm = await Farm.findOne({ farmCode });
    if (!farm) {
      return res.status(404).json({ code: errorCodes.FARM.NOT_FOUND.code });
    }

    farm.txHash = txHash;
    await farm.save();

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      data: farm,
    });
  } catch (error) {
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};

// Lấy txHash theo farmCode
const getTxHashByFarmCode = async (req, res) => {
  try {
    const { farmCode } = req.params;
    const farm = await Farm.findOne({ farmCode });

    if (!farm) {
      return res.status(404).json({ code: errorCodes.FARM.NOT_FOUND.code });
    }

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      txHash: farm.txHash || null,
    });
  } catch (error) {
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};

// Lấy sản phẩm theo farmCode
const getProductsByFarmCode = async (req, res) => {
  try {
    const { farmCode } = req.params;

    const farm = await Farm.findOne({ farmCode });
    if (!farm) {
      return res.status(404).json({ code: errorCodes.FARM.NOT_FOUND.code });
    }

    const products = await Product.find({ farmCode });

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};

// Lấy tất cả farmCode
const getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.find().select("farmCode -_id"); // chỉ lấy farmCode, bỏ _id

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      data: farms.map(f => f.farmCode), // trả về mảng farmCode
    });
  } catch (error) {
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};


module.exports = {
  create,
  updateFarmTxHash,
  getTxHashByFarmCode,
  getProductsByFarmCode,
  getAllFarms,
};
