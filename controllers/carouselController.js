const Carousel = require("../models/Carousel");

// @desc Fetch all active carousel images
// @route GET /api/carousel
// @access Public
const getActiveImages = async (req, res) => {
  try {
    const images = await Carousel.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Add a new carousel image
// @route POST /api/carousel
// @access Admin Only
const addImage = async (req, res) => {
  try {
    const { image, isActive } = req.body;
    const newImage = new Carousel({ image, isActive });

    await newImage.save();
    res.status(201).json({ message: "Image added successfully", image: newImage });
  } catch (error) {
    res.status(500).json({ message: "Failed to add image" });
  }
};

// @desc Update isActive status of an image
// @route PUT /api/carousel/:id
// @access Admin Only
const updateImageStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    const updatedImage = await Carousel.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    );

    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// @desc Delete a carousel image
// @route DELETE /api/carousel/:id
// @access Admin Only
const deleteImage = async (req, res) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete image" });
  }
};

module.exports = { getActiveImages, addImage, updateImageStatus, deleteImage };
