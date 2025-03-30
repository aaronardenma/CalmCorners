
import { Card, CardContent } from "../components/ui/card";
import { Location } from "../types";
import { useNavigate } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import {useEffect, useState} from 'react'
import { Review } from "../types";
import axios from 'axios';

interface LocationCardProps {
  location: Location;
  className?: string;
}

const LocationCard = ({ location, className }: LocationCardProps) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState<number>(location.rating);
  const [reviewCount, setReviewCount] = useState<number>(location.numReviews);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        // Use environment variable for API URL
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        const response = await axios.get(`${baseUrl}/reviews`);
        
        // Filter reviews by location
        const locationReviews = response.data.filter(
          (review: Review) => review.location === location?.name
        );
        
        // Calculate average ratings
        if (locationReviews.length > 0) {
          const avgNoise = locationReviews.reduce(
            (sum: number, review: Review) => sum + review.noiseLevel, 
            0
          ) / locationReviews.length;
          
          const avgBusy = locationReviews.reduce(
            (sum: number, review: Review) => sum + review.busyLevel, 
            0
          ) / locationReviews.length;
          
          // Assuming overall rating is average of noise and busy ratings
          const overallRating = (avgNoise + avgBusy) / 2;
          
          setAverageRating(overallRating);
          setReviewCount(locationReviews.length);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, [location._id]);
  
  const handleClick = () => {
    navigate(`/location/${location._id}`);
  };
  
  // Helper function to determine color based on rating level
  function getColorForRating(level: number): string {
    if (level >= 4) return 'bg-green-500';
    if (level >= 2.5) return 'bg-yellow-500';
    return 'bg-red-500';
  }
  
  return (
    <Card 
      className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="h-36 overflow-hidden">
        <img 
          src={location.imageUrl || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1000'} 
          alt={location.name || location.address}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1">{location.name || location.address}</h3>
        
        <div className="mb-3 flex items-center">
          {isLoading ? (
            <div className="h-2 w-12 rounded bg-gray-300 animate-pulse"></div>
          ) : (
            <>
              <div className={`h-2 w-12 rounded ${getColorForRating(averageRating)}`}></div>
              <span className="ml-2 text-sm">{averageRating.toFixed(1)}/5</span>
            </>
          )}
        </div>
        
        <div className="text-sm text-gray-500 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="truncate">{location.address}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users size={14} />
            <span>
              {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default LocationCard;
