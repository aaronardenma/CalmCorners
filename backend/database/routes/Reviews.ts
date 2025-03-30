import express from "express";
import Review from "../models/ReviewSchema"; 
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

const router = express.Router();

// Save (POST) a new review
router.post("/reviewform", 
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

// GET all reviews (GET /api/reviews)
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find(); 
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
});

// Update (PATCH) a review (PATCH /api/reviews/:id)
router.put("/:id", async (req, res) => {

    const { id } = req.params;  // Get the review ID from the URL
    const { name, textReview, noiseLevel, busyLevel, location, weather, datetime } = req.body;

    try {
        // Find the review by ID
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if the user (by name) is the same as the review's creator
        if (review.name !== name) {
            return res.status(403).json({ message: "You are not authorized to update this review" });
        }

        // Proceed with updating the review if the name matches
        review.textReview = textReview || review.textReview;
        review.noiseLevel = noiseLevel || review.noiseLevel;
        review.busyLevel = busyLevel || review.busyLevel;
        review.location = location || review.location;
        review.weather = weather || review.weather;
        review.datetime = datetime || review.datetime;

        await review.save();  // Save the updated review

        res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update review" });
    }
});

// DELETE a review by ID (DELETE /api/reviews/:id)
router.delete("/:id", async (req, res) => {
    
    const { id } = req.params;  // Get the review ID from the URL params
    const { name } = req.body;  // Get the name from the request body (since we're assuming name is the user ID)

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid review ID format" });
    }

    try {
        // Find the review by ID
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // Check if the user (by name) is the same as the review's creator
        if (review.name !== name) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }

        // Proceed to delete the review if the name matches
        const deletedReview = await Review.findByIdAndDelete(id);

        res.status(200).json({ message: "Review deleted successfully", review: deletedReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete review" });
    }
});

export default router;
