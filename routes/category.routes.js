const express = require('express');
const router = express.Router();
const { createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')


router.post('/create', createCategory)
router.get('/get/:id', getCategory)
router.get('/all', getAllCategory)
router.put('/update', updateCategory)
router.delete('/delete', deleteCategory)
















module.exports = router;