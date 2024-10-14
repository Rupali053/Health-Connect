const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Ensure this path is correct
const flash = require("connect-flash"); 
const session = require('express-session');


router.use(session({
  secret: 'your-secret-key', // Change this to a secure key
  resave: false,
  saveUninitialized: true,
}));

router.use(flash());

// GET: Login page
router.get("/", (req, res) => {
  const errorMsg = req.flash("error");
  res.render("login",{errorMsg});
});

// POST: Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      req.flash("error", "Wrong username or password");
      return res.redirect("/"); // Invalid credentials
    }

    req.session.user = { id: user._id, username: user.username }; // Set the session correctly
    // req.flash('success_msg', 'Successfully logged in!');
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST: Logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
