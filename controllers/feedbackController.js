const  Feedback = require("../models/feedbackModel.js");

// ➤ CREATE Feedback
exports.createFeedback = async (req, res) => {
  try {
    const { author_name, rating, text } = req.body;
    const newFeedback = new Feedback({ author_name, rating, text });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
  } catch (error) {
    res.status(500).json({ message: "Error creating feedback", error: error.message });
  }
};

// ➤ READ Feedbacks (All)
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks", error: error.message });
  }
};

// ➤ READ Single Feedback
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
};

// ➤ UPDATE Feedback
exports.updateFeedback = async (req, res) => {
  try {
    const { author_name, rating, text } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { author_name, rating, text },
      { new: true }
    );
    if (!updatedFeedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback updated successfully", feedback: updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: "Error updating feedback", error: error.message });
  }
};

// ➤ DELETE Feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting feedback", error: error.message });
  }
};
