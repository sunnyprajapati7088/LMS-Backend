const jwt = require("jsonwebtoken");
const User=require ("../models/User.js"); // Adjust path based on your project structure

module.exports  = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Check if user exists and is an admin
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admins only." });
    }

    next(); // Proceed to next middleware or route
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


