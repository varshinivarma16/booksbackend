import express from 'express';
import BookController from '../../bookstore/controllers/homepage';
import ReviewController from '../../bookstore/controllers/review';
import BookRequestController from '../../bookstore/controllers/addbook';
const router = express.Router();

// Category routes
router.get('/categories', BookController.getBooksByCategory);
router.post('/categories', BookController.createCategory);
router.get('/categories/:categoryName', BookController.getCategoryByNameWithBooks);
router.post('/categories/:categoryName', BookController.createBook);
router.delete('/categories/:categoryName', BookController.deleteCategoryByName);
router.get('/categories/:categoryName/:bookId', BookController.getBookDetailsById);
router.delete('/categories/:categoryName', BookController.deleteCategoryByName);
router.delete('/categories', BookController.deleteAllCategories);
router.delete('/books', BookController.deleteAllBooks);


router.post('/reviews', ReviewController.createReview);
router.get('/reviews', ReviewController.getReviews);

router.post('/book-requests', BookRequestController.createBookRequest);
router.get('/book-requests', BookRequestController.getBookRequests);

export default router;