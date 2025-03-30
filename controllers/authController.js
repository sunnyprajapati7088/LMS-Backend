const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");
const { CallPage } = require("twilio/lib/rest/api/v2010/account/call");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!/.+\@.+\..+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, phone, password: hashedPassword, role });
    await user.save();
    await sendEmail(email, name);
    

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};  