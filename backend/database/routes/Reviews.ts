import express from "express";
import Review from "../models/ReviewSchema"; 

const router = express.Router();

// Save a new review
router.post("/", async (req, res) => {
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
        const reviews = await Review.find().populate("location"); // Optional: Populate location data
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
});

export default router;
