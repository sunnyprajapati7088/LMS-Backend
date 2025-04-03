const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const carouselRoutes=require("./routes/carouselRoutes")
const placementRoutes = require("./routes/placementRoutes"); // Import placement routes
const imageRoutes = require("./routes/imageRoutes");
const adminMiddleware = require("./middleware/adminMiddleware");
const categoriesRoutes = require("./routes/categoriesRoutes");
const nodemailer = require('nodemailer');
const  mongoose = require("mongoose");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());    
app.use(cors());

app.use("/api/auth", authRoutes);

app.use('/api/courses', courseRoutes);
app.use('/api/categories',categoriesRoutes );
app.use("/api/carousel",carouselRoutes);
app.use("/api/placement", placementRoutes); 
app.use("/api/images", imageRoutes);// Add this line to include placement routes

require("dotenv").config();

const Callback = mongoose.model('Callback', new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    experienceLevel: String,
    termsAccepted: Boolean,
    createdAt: { type: Date, default: Date.now }
  }));
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: "pmul tqde zwja tejc"
    },
    tls: {
      rejectUnauthorized: false // for local testing only
    }
  });
  // API endpoint
  app.post('/api/callback', async (req, res) => {
    try {
      // Save to database
      const callback = new Callback(req.body);
      await callback.save();
  
      // Send email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'sunnyprajapati9761@gmail.com',
        subject: 'New Career Callback Request',
        html: `
          <h2>New Callback Request</h2>
          <p><strong>Name:</strong> ${req.body.name}</p>
          <p><strong>Email:</strong> ${req.body.email}</p>
          <p><strong>Phone:</strong> ${req.body.phone}</p>
          <p><strong>Experience Level:</strong> ${req.body.experienceLevel}</p>
          <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Callback request submitted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to submit callback request' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));