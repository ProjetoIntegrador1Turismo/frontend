import { TourDescriptionProps } from '@/lib/interfaces';
import React from 'react';
import { DescriptionDialog } from './DescriptionDialog';

const TourDescription = ({ description }: TourDescriptionProps) => {
  const stringLenght = 590;

  return (
    <div className='w-full h-[300px] rounded-lg border border-black p-5 shadow-lg shadow-gray-400 text-2xl'>
      <p className='font-extralight whitespace-pre-wrap overflow-hidden'>
        {description.substring(0, stringLenght) + '...'}
      </p>
      <DescriptionDialog description={description} />
    </div>
  );
};

export default TourDescription;
