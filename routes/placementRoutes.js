const express = require("express");
const {
  addPlacement,
  getPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement,
} =require( "../controllers/placementController.js");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", addPlacement);
router.get("/", getPlacements);
router.get("/:id", getPlacementById);
router.put("/:id",authMiddleware, updatePlacement);
router.put("/delete/:id", deletePlacement);


module.exports = router;
