const router = require("express").Router();
const Opportunity = require("../models/Opportunities");

router.post("/", async (req, res) => {
  const newOpportunity = new Opportunity(req.body);
  try {
    const savedOpportunity = await newOpportunity.save();
    res.status(200).json(savedOpportunity);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const opportunityupdate = await Opportunity.findById(req.params.id);
    if (opportunityupdate.userId == req.body.userId) {
      await opportunityupdate.updateOne({ $set: req.body });
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
    const opportunityupdate = await Opportunity.findById(req.params.id);
    res.status(200).json(opportunityupdate);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const opportunityupdate = await Opportunity.findById(req.params.id);
    await opportunityupdate.deleteOne();
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const opportunityupdate = await Opportunity.find(req.params.id);
    res.status(200).json(opportunityupdate);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
