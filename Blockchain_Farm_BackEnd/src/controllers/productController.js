const { cloudinary } = require("../config/cloudinary");
const Product = require("../models/Product");
const Farm = require("../models/Farm");
const errorCodes = require("../constants/errorCodes");

// Tạo sản phẩm
const create = async (req, res) => {
  
  const userId = req.user.id;
  
  try {
    const { productCode, farmCode } = req.body;
    const images = [];

    const farm = await Farm.findOne({ farmCode });
    if (!farm) {
      return res.status(404).json({ code: errorCodes.FARM.NOT_FOUND.code });
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const base64String = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
        const img = await cloudinary.uploader.upload(base64String);
        images.push(img.secure_url);
      }
    }

    const newProduct = new Product({
      userId,
      productCode,
      farmCode,
      images,
    });

    await newProduct.save();

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};

// Cập nhật txHash
const updateProductTxHash = async (req, res) => {
  try {
    const { productCode, txHash } = req.body;

    const product = await Product.findOne({ productCode });
    if (!product) {
      return res.status(404).json({ code: errorCodes.PROCESS.NOT_FOUND.code });
    }

    product.txHash = txHash;
    await product.save();

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      data: product,
    });
  } catch (error) {
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};
// Lấy tất cả sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};


// Lấy txHash theo productCode
const getTxHashByProductCode = async (req, res) => {
  try {
    const { productCode } = req.params;
    const product = await Product.findOne({ productCode });

    if (!product) {
      return res.status(404).json({ code: errorCodes.PROCESS.NOT_FOUND.code });
    }

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      txHash: product.txHash || null,
    });
  } catch (error) {
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};
// Lấy chi tiết sản phẩm theo productCode
const getProductByCode = async (req, res) => {
  try {
    const { productCode } = req.params;
    const product = await Product.findOne({ productCode });

    if (!product) {
      return res.status(404).json({ code: errorCodes.PROCESS.NOT_FOUND.code });
    }

    res.status(200).json({
      code: errorCodes.COMMON.SERVER_SUCCESS.code,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: errorCodes.COMMON.SERVER_ERROR.code });
  }
};


module.exports = {
  create,
  updateProductTxHash,
  getTxHashByProductCode,
  getAllProducts,
  getProductByCode
};
