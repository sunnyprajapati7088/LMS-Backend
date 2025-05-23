const express = require('express');
const router = express.Router();
const {getAllCourses,getCoursesByCategory,createCourse,updateCourse,deleteCourse} = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',getAllCourses);
router.get('/category/:categoryId', getCoursesByCategory);
router.post('/', authMiddleware,createCourse);
router.put('/:id', authMiddleware, updateCourse);
router.delete('/:id',authMiddleware, deleteCourse);

module.exports = router;