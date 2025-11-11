const User = require("../models/auth");
const bcrypt = require("bcrypt");
const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");
const { cloudinary } = require("../config/cloudinary");
const errorCodes = require("../constants/errorCodes");

// Lấy thông tin user đang đăng nhập
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -refreshToken"
    );
    if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);
    return res.json({ code: 200, user });
  } catch (error) {
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

// Cập nhật user
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, userName, email, phone, address, gender, dateOfBirth } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

    // ===== Check userName =====
    if (userName && userName !== user.userName) {
      const existedUserName = await User.findOne({
        userName,
        _id: { $ne: userId },
      });
      if (existedUserName) {
        return res.status(409).json(errorCodes.COMMON.USER_EXISTS_USERNAME);
      }
      user.userName = userName;
    }

    // ===== Check phone =====
    if (phone && phone !== user.phone) {
      const existedPhone = await User.findOne({
        phone,
        _id: { $ne: userId },
      });
      if (existedPhone) {
        return res.status(409).json(errorCodes.COMMON.USER_EXISTS_PHONE);
      }
      user.phone = phone;
    }

    // ===== Check email (nếu đổi email) =====
    if (email && email !== user.email) {
      const existedEmail = await User.findOne({
        email,
        _id: { $ne: userId },
      });
      if (existedEmail) {
        return res.status(409).json(errorCodes.COMMON.USER_EXISTS_EMAIL);
      }

      user.tempEmail = email;

      // Tạo OTP cho đổi email
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      await Otp.findOneAndUpdate(
        { email, type: "updateEmail" },
        { code, expiresAt, type: "updateEmail" },
        { upsert: true, new: true }
      );

      await sendEmail(email, "Xác nhận thay đổi email", `Mã OTP: ${code}`);
      await user.save();

      return res.json({ code: 200, requireOtp: true });
    }

    // ===== Update các field khác =====
    if (fullName !== undefined) user.fullName = fullName;
    if (address !== undefined) user.address = address;
    if (gender !== undefined) user.gender = gender;

    if (dateOfBirth !== undefined) {
      const year = new Date(dateOfBirth).getFullYear();
      const currentYear = new Date().getFullYear();
      if (!/^\d{4}$/.test(year.toString()) || year >= currentYear) {
        return res
          .status(400)
          .json({ code: "400-9", message: "Ngày sinh không hợp lệ" });
      }
      user.dateOfBirth = year;
    }

    // ===== Update avatar =====
    if (req.file) {
      const file = req.file;
      const base64String = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const img = await cloudinary.uploader.upload(base64String);

      if (user.avatar) {
        try {
          await cloudinary.uploader.destroy(user.avatar);
        } catch (err) {
          console.error("Không thể xoá avatar cũ:", err.message);
        }
      }
      user.avatar = img.public_id;
    }

    await user.save();
    return res.json({ code: 200 });
  } catch (err) {
    console.error("Update user error:", err);
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};


// Đổi mật khẩu
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json(errorCodes.COMMON.MISSING_PASSWORD);
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).json(errorCodes.COMMON.INVALID_CREDENTIALS);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ code: 200 });
  } catch (err) {
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

// Quên mật khẩu - gửi OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email, type: "resetPassword" },
      { code, expiresAt, type: "resetPassword" },
      { upsert: true, new: true }
    );

    await sendEmail(email, "Khôi phục mật khẩu", `Mã OTP: ${code}`);
    return res.json({ code: 200 });
  } catch (err) {
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

// Đặt lại mật khẩu sau khi OTP đã xác thực
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ code: 200 });
  } catch (err) {
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};
// Xóa tài khoản
const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

    // Xóa avatar trên cloudinary (nếu có)
    if (user.avatar) {
      try {
        await cloudinary.uploader.destroy(user.avatar);
      } catch (err) {
        console.error("Không thể xoá avatar:", err.message);
      }
    }

    // Xóa OTP liên quan
    await Otp.deleteMany({ email: user.email });

    // Xóa user
    await User.findByIdAndDelete(userId);

    return res.json({ code: 200, message: "Tài khoản đã được xoá thành công" });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};


module.exports = {
  updateUser,
  getUser,
  changePassword,
  forgotPassword,
  resetPassword,
  deleteUser,
};
