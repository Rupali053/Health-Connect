const express = require("express");
const Doctor = require("../models/Doctor"); // Adjust the path as needed
const router = express.Router();
const Appointment = require("../models/Appointment");

router.get("/doctor/:doctorName/availability", async (req, res) => {
  const { doctorName } = req.params;

  try {
    // Find the doctor by name
    const doctor = await Doctor.findOne({ name: doctorName });

    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    // Dummy data for available times (you can replace this with actual availability)
    const availableTimes = [
      "2024-10-10T09:00:00",
      "2024-10-10T10:00:00",
      "2024-10-10T11:00:00",
      "2024-10-10T14:00:00",
      "2024-10-10T15:00:00",
    ];

    res.render("doctorAvailability", { doctor, availableTimes });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/book-appointment/:doctorName", async (req, res) => {
  const { doctorName } = req.params;

  try {
    const doctor = await Doctor.findOne({ name: doctorName });

    if (!doctor) {
      return res.status(404).send("Doctor not found");
    }

    // Dummy data for available times (you can replace this with actual availability)
    const availableTimes = [
      "2024-10-16T09:00:00",
      "2024-10-16T10:00:00",
      "2024-10-16T11:00:00",
      "2024-10-16T14:00:00",
      "2024-10-16T15:00:00",
      "2024-10-16T17:00:00",
    ];

    res.render("doctorAvailability", { doctor, availableTimes });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Handle booking appointment
router.post("/book-appointment", async (req, res) => {
  const { disease } = req.body;

  try {
    // Find doctors that can treat the selected disease
    const doctors = await Doctor.find({ diseases: disease });

    // Render the dashboard with the filtered doctors
    res.render("doctors", { doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).send("Internal Server Error");
  }
});



router.post("/confirm-appointment", async (req, res) => {
  const { doctor, appointmentTime, diseaseDescription } = req.body;

  try {
    const [date, time] = appointmentTime.split("T");
    // Create a new appointment
    const appointment = new Appointment({
      doctor,
      date: new Date(date), // Make sure date is a Date object
      time, // Keep time as string
      disease: diseaseDescription,
    });

    await appointment.save();

    // Render a confirmation page or message
    res.render("appointmentConfirmation", { appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
