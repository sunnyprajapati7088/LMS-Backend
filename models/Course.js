const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  videoUrls: { type: [String], default: [] }, // Array of Cloudinary URLs
  liveSessionLinks: { type: [String], default: [] }, // Array of ZegoCloud API Links
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);