'use client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { HomeSliderProps } from '@/lib/interfaces';
import SliderCard from './SliderCard';
import { MoveRight, MoveLeft } from 'lucide-react';

const HomeSlider = ({ slides }: HomeSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    appendDots: () => {
      return <></>;
    },
    nextArrow: <MoveRight color='black' />,
    prevArrow: <MoveLeft color='black' />
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {slides.map((slide, i) => {
          return <SliderCard image={slide.image} title={slide.title} key={i} />;
        })}
      </Slider>
    </div>
  );
};

export default HomeSlider;
