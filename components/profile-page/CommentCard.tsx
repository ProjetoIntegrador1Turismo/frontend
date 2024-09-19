import React from 'react';
import Rating from '../home-page/Rating';
import Image from 'next/image';
import { format } from 'date-fns';
import { Comment } from './Profile';
import { CommentDialog } from './CommentDialog';

const CommentCard = ({ comment, profilePic }: { comment: Comment; profilePic: string }) => {
  return (
    <div className='w-[350px] h-[180px] border border-black rounded-xl shadow-md shadow-gray-400 p-4'>
      <div className='flex gap-3'>
        <Image
          height={60}
          width={60}
          alt={comment.tourist.touristName}
          src={comment.tourist.profileImageUrl}
          className='w-[60px] h-[60px] rounded-full object-cover'
          draggable={false}
        />
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className='text-xl font-bold truncate max-w-[130px]'>
              {comment.tourist.touristName}
            </h1>
            <p className='text-sm font-light'>Em {format(comment.wasVisitingDate, 'dd/MM/yyyy')}</p>
          </div>
          <div className='flex gap-3'>
            <div>
              <p className='text-sm font-light'>Avaliação</p>
              <Rating rating={comment.rating} />
            </div>
            <div>
              <p className='text-sm font-light'>Local</p>
              <p className='text-xs font-light truncate w-[140px]'>{comment.interestPoint.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <p className='text-base line-clamp-3'>{comment.text}</p>
        <CommentDialog comment={comment} profilePic={profilePic} />
      </div>
    </div>
  );
};

export default CommentCard;
