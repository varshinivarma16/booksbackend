"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewById = exports.getReviews = exports.createReview = void 0;
const uuid_1 = require("uuid");
// In-memory storage for reviews
let reviews = [];
const createReview = (req, res) => {
    const { nameOrInitials, department, reviewText, rating, agreedToPrivacy } = req.body;
    // Validation
    if (!nameOrInitials || !department || !reviewText || rating === undefined || !agreedToPrivacy) {
        return res.status(400).json({ message: 'All fields are required, and you must agree to the privacy policy.' });
    }
    if (reviewText.length > 500) {
        return res.status(400).json({ message: 'Review text must be 500 characters or less.' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }
    const newReview = {
        id: (0, uuid_1.v4)(),
        nameOrInitials,
        department,
        reviewText,
        rating,
        agreedToPrivacy,
        createdAt: new Date(),
    };
    reviews.push(newReview);
    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
};
exports.createReview = createReview;
const getReviews = (req, res) => {
    res.status(200).json(reviews);
};
exports.getReviews = getReviews;
const getReviewById = (req, res) => {
    const review = reviews.find((r) => r.id === req.params.id);
    if (!review) {
        return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
};
exports.getReviewById = getReviewById;
