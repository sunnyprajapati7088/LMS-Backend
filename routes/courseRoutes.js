const express = require('express');
const router = express.Router();
const {getAllCourses,getCoursesByCategory,createCourse,updateCourse,deleteCourse} = require('../controllers/courseController');

router.get('/',getAllCourses);
router.get('/category/:categoryId', getCoursesByCategory);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;