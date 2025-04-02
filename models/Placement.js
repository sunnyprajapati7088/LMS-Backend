const mongoose = require("mongoose");
const PlacementSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Optional reference to the user who added it
    },
    isActive: {
        type: Boolean,
        default: true // true means image is visible in the carousel
      },
  },
  { timestamps: true }
);

const placement = mongoose.model("placement", PlacementSchema);
module.exports = placement;
