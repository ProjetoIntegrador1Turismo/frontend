import React from 'react';
import { Review } from './GuideProfileTabs';
import Rating from '../home-page/Rating';
import { CommentDialog } from './CommentDialog';
import Image from 'next/image';
import { format } from 'date-fns';

const CommentCard = ({ review }: { review: Review }) => {
  return (
    <div className='w-[400px] h-[200px] border border-black rounded-xl shadow-md shadow-gray-400 p-4'>
      <div className='flex gap-3'>
        <Image
          height={90}
          width={90}
          alt={review.touristName}
          src={review.avatarUrl}
          className='w-[90px] h-[90px] rounded-full object-cover'
          draggable={false}
        />
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className='text-xl font-bold truncate max-w-[160px]'>{review.touristName}</h1>
            <p className='text-sm font-light'>Em {format(review.date, 'dd/MM/yyyy')}</p>
          </div>
          <div>
            <p className='text-sm font-light'>Avaliação</p>
            <Rating rating={review.rating} />
          </div>
        </div>
      </div>
      <div className='flex'>
        <p className='text-base line-clamp-3'>{review.text}</p>
        <CommentDialog review={review} />
      </div>
    </div>
  );
};

export default CommentCard;
