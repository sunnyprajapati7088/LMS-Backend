const express = require("express");
const {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

const router = express.Router();

router.post("/enrollments", createEnrollment);
router.get("/enrollments", getAllEnrollments);
router.get("/enrollments/:id", getEnrollmentById);
router.put("/enrollments/:id", updateEnrollment);
router.delete("/enrollments/:id", deleteEnrollment);

module.exports = router;
