const express = require("express");
const router = express.Router();
const {  authMiddleware } = require("../middlewares/authMiddleware"); 
const{addToWishlist, removeFromWishlist, getWishlist} = require("../controllers/wishlistController")

router.post("/add", authMiddleware, addToWishlist);
router.delete("/delete", authMiddleware, removeFromWishlist);
router.get("/", authMiddleware, getWishlist);

module.exports = router;
