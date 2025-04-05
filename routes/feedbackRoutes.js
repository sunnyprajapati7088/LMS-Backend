const express = require('express');
const {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} =require ("../controllers/feedbackController.js");

const router = express.Router();

router.post("/", createFeedback);       // Create feedback
router.get("/", getAllFeedbacks);       // Get all feedbacks
router.get("/:id", getFeedbackById);    // Get single feedback
router.put("/:id", updateFeedback);     // Update feedback
router.delete("/:id", deleteFeedback);  // Delete feedback

module.exports = router;
