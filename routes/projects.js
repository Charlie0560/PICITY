const router = require("express").Router();
const Project = require("../models/Projects");
const User = require("../models/Users");

router.post("/", async (req, res) => {
  const newProject = new Project(req.body);
  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project.userId == req.body.userId) {
      await project.updateOne({ $set: req.body });
      res.status(200).json("The project has been updated");
    } else {
      rew.status(403).json("You can update only your project");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project.userId == req.body.userId) {
      await project.deleteOne();
      res.status(200).json("the project has been deleted");
    } else {
      res.status(403).json("You can delete only your project");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const projects = await Project.find({ userId: user._id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
