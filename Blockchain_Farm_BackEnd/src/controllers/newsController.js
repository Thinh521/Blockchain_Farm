const News = require("../models/News");
const Farm = require("../models/Farm");
const errorCodes = require("../constants/errorCodes");
const { cloudinary } = require("../config/cloudinary");
const moment = require("moment");
const streamifier = require("streamifier");

function uploadToCloudinary(fileBuffer, mimetype) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
}

exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find()
      .populate("userId", "userName avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({ code: 200, data: newsList });
  } catch (error) {
    console.error("Get all news error:", error);
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};
// 🟢 Thêm tin tức
exports.createNews = async (req, res) => {
  console.log("req.body:", req.body);
  try {
    const now = moment().utcOffset(7);
    const date = now.format("DD/MM/YYYY");
    const time = now.format("HH:mm");

    const { farmCode, nameFarm, title, description } = req.body;
    const userId = req.user.id;



    let images = [];

    if (req.files?.length > 0) {
      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, file.mimetype))
      );

      images = uploadResults.map((res) => ({
        url: res.secure_url,
        publicId: res.public_id,
      }));
    }
    const news = await News.create({
      userId,
      farmCode,
      nameFarm,
      title,
      description,
      images,
      date,
      time,
    });

    return res.status(200).json({ code: 200, data: news });
  } catch (error) {
    console.error("Create news error:", error);
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

// 🟢 Lấy tin tức theo farmCode
exports.getNewsByFarm = async (req, res) => {
  try {
    const { farmCode } = req.params;

    const farm = await Farm.findOne({ farmCode });
    if (!farm) {
      return res.status(404).json(errorCodes.FARM.NOT_FOUND);
    }

    const newsList = await News.find({ farmCode })
      .populate("userId", "userName avatar") 
      .sort({ createdAt: -1 });

    return res.status(200).json({ code: 200, data: newsList });
  } catch (error) {
    console.error("Get news by farm error:", error);
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, nameFarm, oldImages } = req.body;

    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json(errorCodes.NEWS.NOT_FOUND);
    }

    // Chỉ chủ sở hữu mới được sửa
    if (news.userId.toString() !== req.user.id) {
      return res.status(403).json(errorCodes.COMMON.UNAUTHORIZED);
    }

    // ✅ Xử lý ảnh cũ
    let updatedImages = [];
    if (oldImages) {
      if (typeof oldImages === "string") {
        try {
          updatedImages = JSON.parse(oldImages);
        } catch (err) {
          console.error("parse oldImages error", err);
        }
      } else if (Array.isArray(oldImages)) {
        updatedImages = oldImages; // trường hợp frontend gửi array object
      } else {
        updatedImages = [oldImages]; // trường hợp gửi 1 object
      }
    }

    // ✅ Upload ảnh mới lên Cloudinary
    let newImages = [];
    if (req.files?.length > 0) {
      const uploadResults = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, file.mimetype))
      );

      newImages = uploadResults.map((res) => ({
        url: res.secure_url,
        publicId: res.public_id,
      }));
    }

    // ✅ Update dữ liệu (KHÔNG đổi date/time)
    if (title !== undefined) news.title = title;
    if (description !== undefined) news.description = description;
    if (nameFarm !== undefined) news.nameFarm = nameFarm;

    // ✅ Gộp ảnh cũ + mới
    news.images = [...updatedImages, ...newImages];

    await news.save();

    return res.status(200).json({ code: 200, data: news });
  } catch (error) {
    console.error("Update news error:", error);
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json(errorCodes.NEWS.NOT_FOUND);
    }

    if (news.userId.toString() !== req.user.id) {
      return res.status(403).json(errorCodes.COMMON.UNAUTHORIZED);
    }
    for (const img of news.images) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }
    await news.deleteOne();

    return res.status(200).json({ code: 200 });
  } catch (error) {
    console.error("Delete news error:", error);
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};
