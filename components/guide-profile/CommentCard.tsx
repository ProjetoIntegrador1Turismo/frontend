import React from 'react';
import OneStar from '../home-page/OneStar';
import { Review } from './GuideProfileTabs';
import Rating from '../home-page/Rating';
import { CommentDialog } from './CommentDialog';

const CommentCard = ({ review }: { review: Review }) => {
  return (
    <div className='w-[400px] h-[200px] border border-black rounded-xl shadow-md shadow-gray-400 p-4'>
      <div className='flex gap-3'>
        <img
          src={review.avatarUrl}
          className='w-[90px] h-[90px] rounded-full object-cover'
          draggable={false}
        />
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className='text-xl font-bold truncate'>{review.touristName}</h1>
            <p className='text-sm font-light'>Em {review.date}</p>
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
