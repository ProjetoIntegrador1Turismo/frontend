import React from 'react';
import { TourTitleProps } from '@/lib/interfaces';
import Rating from '../home-page/Rating';
import { MapPin } from 'lucide-react';
import TourPrice from './TourPrice';

const Title = ({ tour }: TourTitleProps) => {
  return (
    <div className='flex border-black'>
      <div className='flex flex-col gap-2 w-fit'>
        <h1 className='text-5xl font-semibold tracking-wider'>{tour.title.toUpperCase()}</h1>
        <div className='flex items-center justify-between'>
          <div className='select-none'>
            <p>Avaliação</p>
            <Rating rating={4} />
          </div>
          <div className='h-[35px] w-[1px] bg-black select-none'></div>
          <div className=''>
            <p className='select-none'>Telefone</p>
            <p>{tour.phone}</p>
          </div>
          <div className='h-[35px] w-[1px] bg-black select-none'></div>
          <div className='select-none'>
            <TourPrice price={tour.price} />
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <MapPin />
          <h3 className='text-xs tracking-wide'>{tour.address}</h3>
        </div>
      </div>
    </div>
  );
};

export default Title;
