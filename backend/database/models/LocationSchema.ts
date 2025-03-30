import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    address: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    rating: { type: Number, default: 0 }, 
    numReviews: { type: Number, default: 0 } 
});

const Location = mongoose.model("Location", LocationSchema);
export default Location;
