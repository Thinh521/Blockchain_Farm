const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const farmRoutes = require("./farmRoutes");
const imageRoutes = require("./imageRoutes");
const productRoutes = require("./productRoutes");
const newsRoutes = require("./newsRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const processRoutes = require("./processRoutes");


router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/farms", farmRoutes);
router.use("/images", imageRoutes);
router.use("/products", productRoutes);
router.use("/news", newsRoutes)
router.use("/wishlist", wishlistRoutes);
router.use("/process", processRoutes);


module.exports = router;
