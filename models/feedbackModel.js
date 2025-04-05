const mongoose =require( "mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    author_name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
