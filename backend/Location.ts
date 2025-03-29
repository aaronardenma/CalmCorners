export class Location {
    private address: string;
    private longitude: number;
    private latitude: number;
    private rating: number;
    private numReviews: number;
    
    constructor(address:string, longitude:number, latitude: number, rating: number, numReviews: number) {
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.rating = rating;
        this.numReviews = numReviews;
    }


}