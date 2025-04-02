const express = require('express');
const router = express.Router();
const {getAllCategories,createCategory,deleteCategory} = require('../controllers/categoriesController');

router.get('/',getAllCategories);
router.post('/',createCategory);
router.delete('/:id', deleteCategory);

module.exports = router;