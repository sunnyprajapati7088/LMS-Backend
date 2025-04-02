const Course = require('../models/Course');
const Category = require('../models/Category');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('category');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get courses by category
exports.getCoursesByCategory = async (req, res) => {
  try {
    const courses = await Course.find({ category: req.params.categoryId }).populate('category');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};