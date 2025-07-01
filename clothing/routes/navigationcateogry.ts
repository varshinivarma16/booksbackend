import express from 'express';
import CategoryController from '../../clothing/controllers/navigationcateogry';

const router = express.Router();
// GET
router.get('/', CategoryController.getAllCategories);
router.get('/:gender/:categoryName', CategoryController.getCategoryByNameWithCommonDresses);
router.get('/:gender/:categoryName/:dressId', CategoryController.getDressDetailsById);
router.get('/categories/:gender/:categoryId', CategoryController.getCategoryByNameWithCommonDresses);
 // ✅ New endpoint for dress details by ID
router.delete('/categories', CategoryController.deleteAllCategories);
router.delete('/dresses', CategoryController.deleteAllDresses);
// POST
router.post('/categories', CategoryController.createCategory);
router.post('/dresses', CategoryController.createDress);

export default router;
