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

 exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id, role: user.role ,user:user.name}, process.env.JWT_SECRET, { expiresIn: "5m" });

    res.json({ message: "Login successful", token,role:user.role });

  } catch (error) {
    console.log(error)  
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProfile = async (req, res) => {
  console.log(req)
    try {
      res.json({ message: "Welcome to your profile", user: req.user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error });
    }
  };