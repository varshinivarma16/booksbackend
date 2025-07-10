import express from 'express';
import BookController from '../../bookstore/controllers/homepage';
import { createReview, getReviews, getReviewById, updateReview, deleteReview } from '../../bookstore/controllers/review';
import BookRequestController from '../../bookstore/controllers/addbook';
const router = express.Router();

// Category routes
router.get('/categories', BookController.getAllCategories);
router.post('/categories', BookController.createCategory);
router.get('/categories/:categoryName', BookController.getCategoryByNameWithBooks);
router.post('/categories/:categoryName', BookController.createBook);

// Book details route
router.get('/categories/:categoryName/:bookId', BookController.getBookDetailsById);
router.patch('/categories/:categoryName/:bookId', BookController.updateBookImageUrl);


// Delete routes
router.delete('/categories', BookController.deleteAllCategories);
router.delete('/books', BookController.deleteAllBooks)


router.post('/reviews', createReview);
router.get('/reviews', getReviews);
router.get('/reviews/:id', getReviewById);
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

router.post('/book-requests', BookRequestController.createBookRequest);
router.get('/book-requests', BookRequestController.getBookRequests);

export default router;