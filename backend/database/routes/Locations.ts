import express from "express";
import Location from "../models/LocationSchema";

const router = express.Router();

// Add a new location (POST /api/locations)
router.post("/", async (req, res) => {
    try {
        const { address, longitude, latitude } = req.body;
        const newLocation = new Location({ address, longitude, latitude });
        await newLocation.save();
        res.status(201).json({ message: "Location saved successfully", location: newLocation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to save location" });
    }
});

// Get all locations (GET /api/locations)
router.get("/", async (req, res) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch locations" });
    }
});

export default router;
