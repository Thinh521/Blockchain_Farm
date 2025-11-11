const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmCode: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    nameFarm: {
      type: String,
    },
    likes: {
      type: Number,
      default: () => Math.floor(Math.random() * 500), 
    },
    comments: {
      type: Number,
      default: () => Math.floor(Math.random() * 100) 
    },
    shares: {
      type: Number,
      default: () => Math.floor(Math.random() * 100)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
