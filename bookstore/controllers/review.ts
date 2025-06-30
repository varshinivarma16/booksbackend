import { Request, Response } from 'express';
import Review from '../../bookstore/models/review';

export default class ReviewController {
  static async createReview(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, rating, review } = req.body;
      const newReview = new Review({ name, email, rating, review });
      await newReview.save();
      res.status(201).json(newReview);
    } catch (err) {
      console.error('Error creating review:', err);
      res.status(500).json({ error: 'An unexpected error occurred while creating review' });
    }
  }

  static async getReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      res.status(500).json({ error: 'An unexpected error occurred while fetching reviews' });
    }
  }
}
