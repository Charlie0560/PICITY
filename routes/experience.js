const router = require("express").Router();
const Experience = require("../models/Experience");
const User = require("../models/Users");

router.post("/", async (req, res) => {
  const newExperience = new Experience(req.body);
  try {
    const savedExperience = await newExperience.save();
    res.status(200).json(savedExperience);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience.userId == req.body.userId) {
      await experience.updateOne({ $set: req.body });
      res.status(200).json("The Experience has been updated");
    } else {
      res.status(403).json("You can update only your Experience");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience.userId == req.body.userId) {
      await experience.deleteOne();
      res.status(200).json("the Experience has been deleted");
    } else {
      res.status(403).json("You can delete only your Experience");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    res.status(200).json(experience);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const experiences = await Experience.find({ userId: user._id });
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
