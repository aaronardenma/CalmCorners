import {Location} from './Location'
import {Review} from './Review'

export interface ILocationManager {

    /**
     * 
     * @param review    The Review to be added
     * @param location  The Location for the review to be added to
     * 
     * 
     * @return Review
     * 
     * Should return the review if added successfully.
     * Throw an error if:
     *      Review was not added successfully,
     *      or there is a review with the same name
     */
    addReview(review: Review, location: Location): Review;

    /**
     * 
     * @param review    The Review to be deleted
     * @param location  The Location for the review to be deleted to
     * 
     * 
     * @return Review
     * 
     * Should return the review if deleted successfully.
     * Throw an error if:
     *      Review was not deleted successfully,
     *      or the review does not exist
     */
    deleteReview(review: Review, location:Location): Review;


    /**
     * 
     * @param review    The Review to be deleted
     * @param location  The Location for the review to be deleted to
     * 
     * 
     * @return Review
     * 
     * Should return the updated review if updated successfully.
     * Throw an error if:
     *      Review does not exist,
     *      Location does not exist
     *      Type errors occur with updateValues,
     *      
     */
    updateReview(review: Review, location: Location, updateValues: Record<string, any>): Review;

    /**
     * 
     * @param location  The Location to get Reviews from
     * 
     * 
     * @return Review[]
     * 
     * Should return a list of reviews.
     */
    listReviews(location: Location): Review[];

    /**
     * 
     * 
     */
    fetchLocations(): void;

    /**
     * 
     * @return Location[]
     * 
     * Should return a list of all Locations.
     */
    listLocations(): Location[];
}