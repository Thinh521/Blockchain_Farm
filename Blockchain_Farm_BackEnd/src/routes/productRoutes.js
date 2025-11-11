const express = require("express");
const router = express.Router();
const {
  create,
  updateProductTxHash,
  getTxHashByProductCode,
  getAllProducts,
  getProductByCode,
} = require("../controllers/productController");
const upload = require("../middlewares/upload");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/", upload.array("images"),authMiddleware,  create);
router.put("/txHash", authMiddleware, updateProductTxHash);
router.get("/:productCode", authMiddleware, getTxHashByProductCode);
router.get("/", getAllProducts);
router.get("/details/:productCode",getProductByCode);



module.exports = router;
