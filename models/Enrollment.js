const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    course: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    enrollDate: { type: Date, default: Date.now }, // Auto-filled with current date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
