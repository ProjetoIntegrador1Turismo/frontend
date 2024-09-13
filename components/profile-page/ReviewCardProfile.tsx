import React from 'react';
import Rating from '../home-page/Rating';
import Image from 'next/image';
import { format } from 'date-fns';
import { ReviewDialog } from '../guide-profile/ReviewDialog';
import { Review } from '../guide-profile/GuideProfileTabs';

const ReviewCardProfile = ({ review }: { review: Review }) => {
  return (
    <div className='w-[350px] h-[180px] border border-black rounded-xl shadow-md shadow-gray-400 p-4'>
      <div className='flex gap-3'>
        <Image
          height={60}
          width={60}
          alt={review.touristName}
          src={review.avatarUrl}
          className='w-[60px] h-[60px] rounded-full object-cover'
          draggable={false}
        />
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className='text-xl font-bold truncate max-w-[130px]'>{review.touristName}</h1>
            <p className='text-sm font-light'>Em {format(review.date, 'dd/MM/yyyy')}</p>
          </div>
          <div className='flex gap-3'>
            <div>
              <p className='text-sm font-light'>Avaliação</p>
              <Rating rating={review.rating} />
            </div>
            <div>
              <p className='text-sm font-light'>Nome do Guia</p>
              <p className='text-xs font-light truncate w-[140px]'>{`${review.guide.firstName} ${review.guide.lastName}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <p className='text-base line-clamp-3'>{review.text}</p>
        <ReviewDialog review={review} />
      </div>
    </div>
  );
};

export default ReviewCardProfile;
