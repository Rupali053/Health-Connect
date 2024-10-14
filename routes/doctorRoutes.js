const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor"); // Ensure this path is correct
const Appointment = require("../models/Appointment"); // Ensure this path is correct

router.get("/dashboard", async (req, res) => {
  console.log("Session:", req.session); // Log the session object
  if (!req.session.user) {
    return res.redirect("/");
  }

  try {
    const doctors = await Doctor.find({});
    res.render("dashboard", { doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST: Book Direct Appointment
router.post("/book-direct-appointment", async (req, res) => {
  const { doctor, date, time } = req.body;
  const appointment = new Appointment({
    user: req.session.user.id,
    doctor,
    date,
    time,
  });

  try {
    await appointment.save();
    res.redirect("/appointments"); // Redirect to a page showing booked appointments
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).send("Internal Server Error");
  }
});

// GET: Show all appointments (optional, create this route as needed)
router.get("/appointments", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  try {
    const appointments = await Appointment.find({
      user: req.session.user.id,
    }).populate("doctor");
    res.render("appointments", { appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
