const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    tempEmail: { type: String },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String },
    gender: { type: String, enum: ["male", "female", "other"] },
    dateOfBirth: { type: Number },
    avatar: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    expireAt: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 10 * 60 * 1000);
      },
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (this.isVerified && this.expireAt) {
    this.expireAt = undefined;
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
