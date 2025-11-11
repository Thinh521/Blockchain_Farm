const express = require("express");
const router = express.Router();
const {  authMiddleware } = require("../middlewares/authMiddleware"); 
const { getUser, changePassword, updateUser,forgotPassword, resetPassword, deleteUser } = require("../controllers/userController");
const upload = require("../middlewares/upload");


router.put("/update", authMiddleware,upload.single('avatar'), updateUser);
router.get("/get-user", authMiddleware, getUser);
router.put("/change-password", authMiddleware, changePassword);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
router.delete("/delete", authMiddleware, deleteUser);



module.exports = router;
