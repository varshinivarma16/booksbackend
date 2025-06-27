import express from 'express';
import BookController from '../../bookstore/controllers/homepage';

const router = express.Router();

// Category routes
router.get('/categories', BookController.getAllCategories);
router.post('/categories', BookController.createCategory);
router.get('/categories/:categoryName', BookController.getCategoryByNameWithBooks);
router.post('/categories/:categoryName', BookController.createBook);
router.delete('/categories/:categoryName', BookController.deleteCategoryByName);


// Book details route
router.get('/categories/:categoryName/:bookId', BookController.getBookDetailsById);


// Delete routes
router.delete('/categories/:categoryName', BookController.deleteCategoryByName);
router.delete('/categories', BookController.deleteAllCategories);
router.delete('/books', BookController.deleteAllBooks);

export default router;