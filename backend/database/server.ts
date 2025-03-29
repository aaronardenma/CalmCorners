// Main Express Server

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import reviewRoutes from "./routes/Reviews";

dotenv.config({ path: "db.env" });

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if not specified
const mongoURI = process.env.DB_URI as string;

app.use(express.json()); // Parse JSON request body
app.use(cors()); // Allow cross-origin requests

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

    app.get("/", (req, res) => {
        res.send("Quiet Space Finder API is running...");
    });
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });