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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));