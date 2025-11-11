const express = require("express");
const router = express.Router();
const {
  updateProcessStep,
  getProcessByProduct,
  uploadProcessStepImage
} = require("../controllers/processController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const upload = require('../middlewares/upload');


router.post("/step", authMiddleware, updateProcessStep);

router.get("/:productCode", getProcessByProduct);

router.post('/upload',  authMiddleware,upload.array('images'), uploadProcessStepImage);


module.exports = router;
