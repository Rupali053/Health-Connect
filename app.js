const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const User = require("./models/User");
const Doctor = require("./models/Doctor");
const doctorRoutes = require("./routes/doctorRoutes"); // Adjust path as needed
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = 3000;
const path = require("path");
const appointmentRoutes = require("./routes/appointmentRoutes");
const Appointment = require("./models/Appointment");
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://anuj1488be20:JoNxgQRoBHBPypgk@cluster0.9jnps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Set up EJS
app.set("view engine", "ejs");

// Middleware for parsing form data
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// Session & Flash Middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(flash());

app.use("/auth", authRoutes);
app.use("/doctors", doctorRoutes);
app.use("/", appointmentRoutes);

// Set global variables for messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("index"); // Render index.ejs
});
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/dashboard", (req, res) => {
  res.render("dashboard", { doctors: [] }); // Ensure doctors is always defined
});

// Handle Signup Form
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      req.flash("error_msg", "Email is already registered");
      return res.redirect("/signup");
    }

    user = new User({ username, email, password });
    await user.save();
    req.flash("success_msg", "You are registered and can log in");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/signup");
  }
});

// Handle Login Form
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_msg", "No user found with this email");
      return res.redirect("/login");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash("error_msg", "Incorrect password");
      return res.redirect("/login");
    }

    req.session.userId = user.id;
    req.flash("success_msg", "Login successful");
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next(); // Proceed if logged in
  } else {
    req.flash("error_msg", "You must be logged in to view this page");
    return res.redirect("/login"); // Redirect to login if not logged in
  }
}

// Fetch all appointments for the logged-in user
app.get("/appointments", ensureAuthenticated, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.session.userId }); // Fetch appointments
    res.render("dashboard", { appointments }); // Pass appointments to the view
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error fetching appointments");
    res.redirect("/dashboard");
  }
});

// Route to book appointments
app.post("/book-appointment", async (req, res) => {
  const { disease, doctorId, date, time } = req.body; // Get necessary fields from the request

  try {
    const newAppointment = new Appointment({
      user: req.session.userId, // Associate appointment with logged-in user
      doctor: doctorId,
      date: date,
      time: time,
      disease: disease,
    });

    await newAppointment.save(); // Save the appointment

    req.flash("success_msg", "Appointment booked successfully!");
    res.redirect("/appointments"); // Redirect to appointments page
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Error booking appointment");
    res.redirect("/dashboard"); // Redirect to dashboard in case of error
  }
});

app.use(
  session({
    secret: "your_secret_key", // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Use doctor routes
app.use("/", doctorRoutes); // Use the doctor routes

// Listen on the specified PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// JoNxgQRoBHBPypgk
