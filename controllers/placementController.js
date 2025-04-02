const placement = require("../models/Placement.js");
const Placement =require( "../models/Placement.js");

// Add Placement
const addPlacement = async (req, res) => {
  try {
    const { image, company, name, user } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const newPlacement = new Placement({
      image,
      company,
      name,
      user,
    });

    await newPlacement.save();
    res.status(201).json(newPlacement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Placements
const getPlacements = async (req, res) => {
  try {
    const placements = (await Placement.find().populate("user", "name email"))
    res.status(200).json(placements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Placement
 const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id).populate("user", "name email");
    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }
    res.status(200).json(placement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Placement
 const updatePlacement = async (req, res) => {
  try {
    const updatedPlacement = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlacement) {
      return res.status(404).json({ message: "Placement not found" });
    }
    res.status(200).json(updatedPlacement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Placement
const deletePlacement = async (req, res) => {
    try {
        console.log("hello")
      const placement = await Placement.findById(req.params.id);
        console.log(placement)
      if (!placement) {
        return res.status(404).json({ message: "Placement not found" });
      }
  
      // Set isActive to false instead of deleting the placement
      placement.isActive = false;
      await placement.save();
      
      res.status(200).json({ message: "Placement marked as inactive successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = { getPlacementById, deletePlacement, updatePlacement, addPlacement, getPlacements };   