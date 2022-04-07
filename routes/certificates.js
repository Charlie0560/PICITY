const router = require("express").Router();
const Certificate = require("../models/Certifications");
const User = require("../models/Users");

router.post("/", async (req, res) => {
  const newCertificate = new Certificate(req.body);
  try {
    const savedCertificate = await newCertificate.save();
    res.status(200).json(savedCertificate);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (certificate.userId == req.body.userId) {
      await certificate.updateOne({ $set: req.body });
      res.status(200).json("The Certificate has been updated");
    } else {
      res.status(403).json("You can update only your Certificate");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (certificate.userId == req.body.userId) {
      await certificate.deleteOne();
      res.status(200).json("the Certificate has been deleted");
    } else {
      res.status(403).json("You can delete only your Certificate");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    res.status(200).json(certificate);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const certificates = await Certificate.find({ userId: user._id });
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
