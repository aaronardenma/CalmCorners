import { ILocationManager } from "./ILocationManager";
import { Review } from "./Review";
import { Location } from "./Location";

export class LocationManager {
    
    addReview(review: Review, location: Location): string {
        return "";
    }

    deleteReview(review: Review, location:Location): string {
        return "";
    }

    updateReview(review: Review, location:Location): string {
        return "";
    }

    listReviews(location: Location): Review[] {
        return [];
    }
}