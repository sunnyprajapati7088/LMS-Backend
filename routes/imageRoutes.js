const express = require("express");
const upload = require("../middleware/upload");
const { uploadImage } = require("../controllers/imageController");

const router = express.Router();

// Route for uploading the image
router.post("/upload", upload.single("file"), uploadImage);

module.exports = router;
