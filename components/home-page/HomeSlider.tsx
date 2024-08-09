import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { FirstSlider, HomeSliderProps } from '@/lib/interfaces';
import SliderCard from './SliderCard';

const HomeSlider = ({ slides }: {slides: FirstSlider[]}) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true
      }}
      className='w-full'
    >
      <CarouselContent>
        {slides.map((tour, index) => (
          <CarouselItem key={index} className='md:basis-1/3 lg:basis-1/6 sm:basis-1/2'>
            <SliderCard image={tour.imageCoverUrl} title={tour.name} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomeSlider;
