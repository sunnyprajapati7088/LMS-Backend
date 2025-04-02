const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true // true means image is visible in the carousel
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

  const Carousel = mongoose.model("Carousel", carouselSchema);
  module.exports = Carousel;
