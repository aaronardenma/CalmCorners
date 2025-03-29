import {Location} from './Location'

export enum Weather {
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Sunny = 'sunny',
    PartlyCloudy = 'partly_cloudy',
    Snowy = 'snowy'
}


export class Review {
    private name: string;
    private textReview: string;
    private noiseLevel: number;
    private busyLevel: number;
    private location: Location;
    private weather: Weather;
    private datetime: Date;

    constructor(name:string, textReview: string, noiseLevel: number, busyLevel:number, location:Location, weather: Weather, datetime:Date) {
        this.name = name;
        this.textReview = textReview;
        this.noiseLevel = noiseLevel;
        this.busyLevel = busyLevel;
        this.location = location;
        this.weather = weather;
        this.datetime = datetime;
    }
}