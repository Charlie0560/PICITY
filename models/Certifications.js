const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title:{
        type: String
    },
    date: {
      type: String
    },
    url: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", CertificateSchema);
