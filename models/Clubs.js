const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  clubname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  link: {
    type: String,
  },
},
{timestamps: true}
);

module.exports = mongoose.model("Clubs", ClubSchema);
