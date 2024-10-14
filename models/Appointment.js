const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: "User",required: true  },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  disease: { type: String, required: true },
});

//  module.exports = mongoose.model('Appointment', AppointmentSchema);

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
