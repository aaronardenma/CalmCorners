// Main Express Server

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reviewRoutes from "./routes/Reviews";

const app = express();

app.use(express.json()); // Parse JSON request body
app.use(cors()); // Allow cross-origin requests

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/quiet_space_finder")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Use review routes
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
