const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title:{
        type: String
    },
    desc: {
      type: String,
      max: 500,
      required: true,
    },
    projectlink: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
