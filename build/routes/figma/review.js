"use strict";
const { Router } = require('express');
const { createReview, getReviews, getReviewById } = require('../../controllers/figma/review');
const router = Router();
router.post('/', createReview);
router.get('/', getReviews);
router.get('/:id', getReviewById);
module.exports = router;
