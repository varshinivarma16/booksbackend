import { Router } from 'express';
import {CategoryController } from '../../bookstore/controllers/category';



const router = Router();

// Routes
router.get('/', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById);
router.post('/', CategoryController.createCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;