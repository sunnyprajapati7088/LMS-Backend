const express = require("express");
const { getActiveImages, addImage, updateImageStatus, deleteImage } = require("../controllers/carouselController");
const adminMiddleware = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getActiveImages);
router.post("/add/",authMiddleware,addImage);
router.put("/:id", updateImageStatus);
router.delete("/:id", deleteImage);

module.exports = router;
