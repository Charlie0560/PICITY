const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    desc: {
      type: String,
      max: 500,
      required: true,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    embeddedvideo: {
      type: String,
      default: null,
    },
    projectlink: {
      type: String,
    },
    comments: {
      commentor: {
        type: String,
      },
      commentmsg: {
        type: String,
      },
      commentorId: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
