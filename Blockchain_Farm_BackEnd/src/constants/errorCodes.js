// src/constants/errors.js
module.exports = {
  COMMON: {
    MISSING_EMAIL: { code: "400-1" }, // , message: "Thiếu email"
    MISSING_PHONE: { code: "400-2" }, // , message: "Thiếu số điện thoại"
    MISSING_PASSWORD: { code: "400-3" }, // , message: "Thiếu mật khẩu"
    MISSING_USERNAME: { code: "400-9" }, // , message: "Thiếu tên người dùng"
    MISSING_OTP: { code: "400-4" }, // , message: "Thiếu OTP"

    INVALID_EMAIL: { code: "400-5" }, // , message: "Email không hợp lệ"
    INVALID_PHONE: { code: "400-6" }, // , message: "Số điện thoại không hợp lệ"
    INVALID_OTP: { code: "400-7" }, // , message: "OTP không chính xác"

    EXPIRED_OTP: { code: "400-8" }, //  message: "OTP đã hết hạn"

    INVALID_CREDENTIALS: { code: "401-1" }, //  message: "Sai tài khoản hoặc mật khẩu"
    UNAUTHORIZED: { code: "401-2" }, //  message: "Chưa đăng nhập hoặc token không hợp lệ"

    USER_NOT_VERIFIED: { code: "403-1" }, //  message: "Tài khoản chưa xác minh"

    USER_NOT_FOUND: { code: "404-1" }, //  message: "Không tìm thấy người dùng"

    USER_EXISTS_EMAIL: { code: "409-1" }, //  message: "Email đã tồn tại"
    USER_EXISTS_PHONE: { code: "409-2" }, //  message: "Số điện thoại đã tồn tại"
    USER_EXISTS_USERNAME: { code: "409-3" }, //  message: "Tên người dùng đã tồn tại"

    SERVER_ERROR: { code: "500-1" }, //  message: "Lỗi server"
    SERVER_SUCCESS: { code: "200" }, //  message: "Success"
  },

  REGISTER: {
    WEAK_PASSWORD: { code: "400-REG-1" }, //  message: "Mật khẩu quá yếu"
    INVALID_NAME: { code: "400-REG-2" }, //  message: "Tên không hợp lệ"
  },
  FARM: {
    NOT_FOUND: { code: "404-FARM-1" }, // message: "Không tìm thấy farm"
  },
  NEWS: {
    NOT_FOUND: { code: "404-NEWS-1" }, // message: "Không tìm thấy tin tức"
  },
  PROCESS: {
    MISSING_PARAMS: { code: "400-PROCESS-1" },
    INVALID_STEP: { code: "400-PROCESS-2" },
    NOT_FOUND: { code: "404-PROCESS-1" },
  },
};
