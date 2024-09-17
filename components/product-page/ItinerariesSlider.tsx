import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { GuideItineraries } from './ItinerariesDialog';
import ItinerarySliderCard from './ItinerarySliderCard';

const ItinerariesSlider = ({ slides }: { slides: GuideItineraries }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true
      }}
      className='max-w-[1050px]'
    >
      <CarouselContent>
        {slides.map((itinerary, index) => (
          <CarouselItem key={index} className='lg:basis-1/5'>
            <ItinerarySliderCard
              id={itinerary.id}
              imageCoverUrl={itinerary.imageCoverUrl}
              name={itinerary.title}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ItinerariesSlider;
