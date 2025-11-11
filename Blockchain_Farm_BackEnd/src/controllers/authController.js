const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const Otp = require("../models/Otp");
const sendEmail = require("../utils/sendEmail");
const errorCodes = require("../constants/errorCodes");
const e = require("express");
const Login = require("../models/Login");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refreshSecret123";

// Generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "5m" });
  const refreshToken = jwt.sign({ id: userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// Đăng ký
const register = async (req, res) => {
  try {
    const { email, phone, password, userName } = req.body;

    if (!email) return res.status(400).json(errorCodes.COMMON.MISSING_EMAIL);
    if (!phone) return res.status(400).json(errorCodes.COMMON.MISSING_PHONE);
    if (!password)
      return res.status(400).json(errorCodes.COMMON.MISSING_PASSWORD);
    if (!userName)
      return res.status(400).json(errorCodes.COMMON.MISSING_USERNAME);

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json(errorCodes.COMMON.INVALID_EMAIL);
    }

    // Check email
    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res.status(409).json(errorCodes.COMMON.USER_EXISTS_EMAIL);

    // Check phone
    const phoneExist = await User.findOne({ phone });
    if (phoneExist)
      return res.status(409).json(errorCodes.COMMON.USER_EXISTS_PHONE);

    // Check userName
    const userNameExist = await User.findOne({ userName });
    if (userNameExist)
      return res.status(409).json(errorCodes.COMMON.USER_EXISTS_USERNAME);

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      phone,
      password: hashed,
      userName,
      isVerified: false,
    });
    await user.save();

    // 🔑 Tạo OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email, type: "register" },
      { code, expiresAt, type: "register" },
      { upsert: true, new: true }
    );

    // ✉️ Gửi email OTP
    await sendEmail(email, "Mã OTP xác thực", `Mã OTP của bạn là: ${code}`);

    return res.status(200).json(errorCodes.COMMON.SERVER_SUCCESS);
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

// Login
const login = async (req, res) => {
  try {
    const { emailPhone, password } = req.body;
    if (!emailPhone) return res.status(400).json(errorCodes.COMMON.MISSING_PHONE);
    if (!password) return res.status(400).json(errorCodes.COMMON.MISSING_PASSWORD);

    const user = await User.findOne({ $or: [{ email: emailPhone }, { phone: emailPhone }] });
    if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);
    if (!user.isVerified) return res.status(403).json(errorCodes.COMMON.USER_NOT_VERIFIED);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json(errorCodes.COMMON.INVALID_CREDENTIALS);

    const { accessToken, refreshToken } = generateTokens(user._id);

    await Login.findOneAndUpdate(
      { userId: user._id },
      {
        $push: { refreshToken },
        loginTime: new Date(),
        ip: req.ip,
        device: req.headers["user-agent"],
        expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      { upsert: true, new: true }
    );

    res.json({
      code: "200",
      accessToken,
      refreshToken,
      user: { id: user._id, email: user.email, phone: user.phone, userName: user.userName },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};


// Refresh Token
const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json(errorCodes.COMMON.UNAUTHORIZED);

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ code: "403-2" }); // REFRESH_TOKEN_EXPIRED

      const { accessToken } = generateTokens(decoded.id);
      res.json({ code: "200", accessToken });
    });
  } catch (err) {
    res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(200).json(errorCodes.COMMON.SERVER_SUCCESS);

    await Login.findOneAndUpdate(
      { refreshToken },
      { $pull: { refreshToken } },
      { new: true }
    );

    res.json(errorCodes.COMMON.SERVER_SUCCESS);
  } catch (err) {
    res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};
// Xác thực OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp, type } = req.body;

    if (!otp) return res.status(400).json(errorCodes.COMMON.MISSING_OTP);

    const record = await Otp.findOne({ email, type });
    if (!record) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

    if (record.code !== otp.toString())
      return res.status(400).json(errorCodes.COMMON.INVALID_OTP);

    if (record.expiresAt < new Date())
      return res.status(400).json(errorCodes.COMMON.EXPIRED_OTP);

    let user;

    if (type === "register") {
      user = await User.findOne({ email });
      if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

      user.isVerified = true;
      await user.save();
    } else if (type === "updateEmail") {
      user = await User.findOne({ tempEmail: email });
      if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

      user.email = user.tempEmail;
      user.tempEmail = null;
      await user.save();
    } else if (type === "resetPassword") {
      user = await User.findOne({ email });
      if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);

      await Otp.deleteOne({ email, type });
      return res.json({
        code: errorCodes.COMMON.SERVER_SUCCESS,
        verifyPassword: true,
        email,
      });
    }

    await Otp.deleteOne({ email, type });
    res.json( errorCodes.COMMON.SERVER_SUCCESS );
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

// Gửi lại OTP
const resendOtp = async (req, res) => {
  try {
    const { email, type } = req.body;

    let user =
      type === "register"
        ? await User.findOne({ email })
        : type === "updateEmail"
        ? await User.findOne({ tempEmail: email })
        : await User.findOne({ email });

    if (!user) return res.status(404).json(errorCodes.COMMON.USER_NOT_FOUND);
    if (user.isVerified && type === "register")
      return res.status(403).json(errorCodes.COMMON.USER_NOT_VERIFIED);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email, type },
      { code, expiresAt, type },
      { upsert: true, new: true }
    );

    await sendEmail(email, "Mã OTP xác thực", `Mã OTP của bạn là: ${code}`);

    res.json( errorCodes.COMMON.SERVER_SUCCESS );
  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json(errorCodes.COMMON.SERVER_ERROR);
  }
};

// Cleanup user chưa verify
const cleanupUnverifiedUsers = async () => {
  try {
    const threshold = new Date(Date.now() - 5 * 60 * 1000);
    await User.deleteMany({ isVerified: false, createdAt: { $lt: threshold } });
    console.log("Đã xóa các tài khoản chưa xác thực");
  } catch (err) {
    console.log("Lỗi khi xóa tài khoản: ", err);
  }
};

module.exports = {
  register,
  login,
  logout,
  cleanupUnverifiedUsers,
  verifyOtp,
  resendOtp,
  refresh
};
