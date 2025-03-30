import express from "express";
import Review from "../models/ReviewSchema"; 
import { body, validationResult } from "express-validator";

const router = express.Router();

// Save a new review
router.post("/", 
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('textReview').notEmpty().withMessage('Review text is required'),
        body('noiseLevel').isInt({ min: 1, max: 5 }).withMessage('Noise level must be between 1 and 5'),
        body('busyLevel').isInt({ min: 1, max: 5 }).withMessage('Busy level must be between 1 and 5'),
        body('location').notEmpty().withMessage('Location is required'),
        body('weather').isIn(['rainy', 'cloudy', 'sunny', 'partly_cloudy', 'snowy']).withMessage('Invalid weather type'),
        body('datetime').isISO8601().withMessage('Invalid datetime format')
    ], 
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });  // If validation fails, return errors
    }

    try {
        const { name, textReview, noiseLevel, busyLevel, location, weather, datetime } = req.body;

        const newReview = new Review({
            name,
            textReview,
            noiseLevel,
            busyLevel,
            location,
            weather,
            datetime
        });

        await newReview.save();
        res.status(201).json({ message: "Review saved successfully", review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save review" });
    }
});

// Get all reviews (GET /api/reviews)
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find(); 
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
});

export default router;
