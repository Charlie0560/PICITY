const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jwt-then");
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailRegex = /@ms.pict.edu|@pictsctr.onmicrosoft.com|@pict.edu/;
    if (!emailRegex.test(email)) throw "Email is not supported";
    if (password.length < 6) throw "Password must be atleast of 6 characters";
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send("User not found");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrongpassword");

    res.status(200).json(user);
  } catch (err) {
    // res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
