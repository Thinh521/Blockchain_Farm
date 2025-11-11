const express = require('express');
const router = express.Router();
const { create,  getTxHashByFarmCode, updateFarmTxHash, getProductsByFarmCode, getAllFarms } = require('../controllers/farmController');
const upload = require('../middlewares/upload');
const { authMiddleware } = require('../middlewares/authMiddleware');

// POST /api/farms
router.post('/', authMiddleware,upload.array('images'), create);
router.put('/txHash',authMiddleware,  updateFarmTxHash);
router.get('/:farmCode',  getTxHashByFarmCode);
router.get("/:farmCode/products", getProductsByFarmCode);
router.get("/", getAllFarms);

module.exports = router;
