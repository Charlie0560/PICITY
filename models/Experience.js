const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    company: {
      type: String,
      max: 500,
    },
    timeduration: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", ExperienceSchema);
