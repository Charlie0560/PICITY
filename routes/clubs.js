const router = require("express").Router();
const Clubs = require("../models/Clubs");

router.post("/", async (req, res) => {
  const newClubUpdate = new Clubs(req.body);
  try {
    const savedUpdate = await newClubUpdate.save();
    res.status(200).json(savedUpdate);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const clubupdate = await Clubs.findById(req.params.id);
    if (clubupdate.userId == req.body.userId) {
      await clubupdate.updateOne({ $set: req.body });
      res.status(200).json("Updated");
    } else {
      res.status(403).json("You can update only your updates");
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const clubupdate = await Clubs.findById(req.params.id);
    res.status(200).json(clubupdate);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const clubupdate = await Clubs.findById(req.params.id);
    await clubupdate.deleteOne();
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const clubupdates = await Clubs.find(req.params.id);
    res.status(200).json(clubupdates);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
