import { ILocationManager } from "./ILocationManager";
import { Review } from "./Review";
import { Location } from "./Location";

export class LocationManager implements ILocationManager {
    
    public addReview(review: Review, location: Location): Review {
        return review;
    }

    public deleteReview(review: Review, location:Location): Review {
        return review;
    }

    public updateReview(review: Review, location:Location): Review {
        return review;
    }

    public listReviews(location: Location): Review[] {
        return [];
    }

    public listLocations(): Location[] {
        return []
    }
}