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
     * Should return the review if deleted successfully.
     * Throw an error if:
     *      Review was not deleted successfully,
     *      or the review does not exist
     */
    updateReview(review: Review, location: Location, updateValues: Record<string, any>): string;

    listReviews(location: Location): Review[];
}