const Enrollment = require("../models/Enrollment");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Nodemailer Transporter (Gmail SMTP Example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: "xryn exlp zckc icne", // Your email app password
  },
});

// Function to send emails
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email sending error:", error);
  }
};

// ✅ Create an enrollment
const createEnrollment = async (req, res) => {
  try {
    const { course, name, email, phone } = req.body;
    const newEnrollment = new Enrollment({ course, name, email, phone });

    await newEnrollment.save();

    // Email to the user
    const userMessage = `Hello ${name},\n\nYou have successfully enrolled in the course: ${course}.\n\nThank you!`;
    sendEmail(email, "Course Enrollment Confirmation", userMessage);

    // Email to the admin
    const adminMessage = `New Enrollment Received:\n\nCourse: ${course}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`;
    sendEmail("ins.webdatabase@gmail.com", "New Course Enrollment", adminMessage);

    res.status(201).json({ message: "Enrollment created successfully", enrollment: newEnrollment });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Read all enrollments
const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Read a single enrollment by ID
const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json(enrollment);
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update an enrollment
const updateEnrollment = async (req, res) => {
  try {
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEnrollment) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json({ message: "Enrollment updated successfully", enrollment: updatedEnrollment });
  } catch (error) {
    console.error("Error updating enrollment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Delete an enrollment
const deleteEnrollment = async (req, res) => {
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!deletedEnrollment) return res.status(404).json({ error: "Enrollment not found" });
    res.status(200).json({ message: "Enrollment deleted successfully" });
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};
