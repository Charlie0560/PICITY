const mongoose = require("mongoose");

module.exports.Otp = mongoose.model(
  "Otp",
  mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      otp: {
        type: String,
        required: true,
      },
      createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
    },
    { timestamps: true }
  )
);
