import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    textReview: { type: String, required: true },
    noiseLevel: { type: Number, required: true, min: 1, max: 5 },
    busyLevel: { type: Number, required: true, min: 1, max: 5 },
    // location: { type: mongoose.Schema.Types.ObjectId, ref: "Location", required: true }, 
    location: { type: String, required: true }, 
    weather: { type: String, enum: ["rainy", "cloudy", "sunny", "partly_cloudy", "snowy"], required: true },
    datetime: { type: Date, default: Date.now }
});

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
