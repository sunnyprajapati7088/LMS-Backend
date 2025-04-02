const cloudinary = require("cloudinary").v2;
const ImageUpload = require("../models/ImageUpload"); // If you want to store URLs in DB

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle image upload
exports.uploadImage = async (req, res) => {
    console.log("hello")
    console.log(req.file); // Check if the file is received correctly
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Upload the image to Cloudinary
    cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          return res.status(500).send(error.message);
        }

        // Optionally, store the image URL in the database
        const newImage = new ImageUpload({
          imageUrl: result.secure_url,
        });
        await newImage.save();

        // Respond with the uploaded image URL
        res.json({ url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong.");
  }
};
