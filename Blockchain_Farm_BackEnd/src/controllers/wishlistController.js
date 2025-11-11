const Wishlist = require("../models/Wishlist");
const Farm = require("../models/Farm");
const ERRORS = require("../constants/errorCodes");

const addToWishlist = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const { farmCode } = req.body;
    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, farms: [farmCode] });
    } else {
      if (!wishlist.farms.includes(farmCode)) {
        wishlist.farms.push(farmCode);
      }
    }

    await wishlist.save();

    res.json({ code: ERRORS.COMMON.SERVER_SUCCESS.code, wishlist });
  } catch (err) {
    res.status(500).json({
      code: ERRORS.COMMON.SERVER_ERROR.code,
      message: err.message,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { farmCode } = req.body;
    const userId = req.user.id;

    if (!farmCode) {
      return res.status(400).json({
        code: ERRORS.COMMON.INVALID_REQUEST.code,
        message: "farmCode is required",
      });
    }

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({
        code: ERRORS.COMMON.USER_NOT_FOUND.code,
        message: "Wishlist not found",
      });
    }

    wishlist.farms = wishlist.farms.filter(
      (code) =>
        String(code).trim().toUpperCase() !==
        String(farmCode).trim().toUpperCase()
    );

    await wishlist.save();

    res.json({
      code: ERRORS.COMMON.SERVER_SUCCESS.code,
      message: "Removed successfully",
      wishlist,
    });
  } catch (err) {
    res.status(500).json({
      code: ERRORS.COMMON.SERVER_ERROR.code,
      message: err.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ user: userId }).lean(); 

    if (!wishlist) return res.json({ farms: [] });

    const farms = await Farm.find({ farmCode: { $in: wishlist.farms } })
      .select("farmCode farmName location") 
      .lean();

    res.json({
      code: ERRORS.COMMON.SERVER_SUCCESS.code,
      wishlist: { ...wishlist, farms },
    });
  } catch (err) {
    res.status(500).json({
      code: ERRORS.COMMON.SERVER_ERROR.code,
      message: err.message,
    });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
