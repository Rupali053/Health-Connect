// models/Doctor.js
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  diseases: {
    type: [String],
    required: true,
  },
});

// const Doctor = mongoose.model('Doctor', doctorSchema);

// module.exports = Doctor;

module.exports = mongoose.model("Doctor", doctorSchema);
