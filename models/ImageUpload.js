const mongoose = require("mongoose");

const imageUploadSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ImageUpload = mongoose.model("ImageUpload", imageUploadSchema);

module.exports = ImageUpload;
