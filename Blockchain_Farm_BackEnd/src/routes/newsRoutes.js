const express = require("express");
const router = express.Router();
const {
  createNews,
  getNewsByFarm,
  updateNews,
  deleteNews,
  getAllNews,
} = require("../controllers/newsController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get("/all", getAllNews);

router.post("/create", authMiddleware, upload.array("images", 5), createNews);

router.get("/:farmCode", getNewsByFarm);

router.put("/:id", authMiddleware, upload.array("images", 5), updateNews);

router.delete("/:id", authMiddleware, deleteNews);

module.exports = router;
