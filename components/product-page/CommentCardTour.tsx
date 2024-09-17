import { format } from 'date-fns';
import Image from 'next/image';
import { Comment } from '../profile-page/Profile';
import Rating from '../home-page/Rating';
import { CommentDialog } from '../profile-page/CommentDialog';

const CommentCardTour = ({ comment, profilePic }: { comment: Comment; profilePic: string }) => {
  return (
    <div className='w-[350px] h-[200px] border border-black rounded-xl shadow-md shadow-gray-400 p-4 flex flex-col gap-2'>
      <div className='flex gap-3'>
        <Image
          height={90}
          width={90}
          alt={comment.touristName}
          src={profilePic}
          className='w-[70px] h-[70px] rounded-full object-cover'
          draggable={false}
        />
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className='text-xl font-bold truncate max-w-[150px]'>{comment.touristName}</h1>
            <p className='text-xs font-light'>Em {format(comment.wasVisitingDate, 'dd/MM/yyyy')}</p>
          </div>
          <div>
            <div>
              <p className='text-sm font-light'>Avaliação</p>
              <Rating rating={comment.rating} />
            </div>
          </div>
        </div>
      </div>
      <div className='flex h-[60%]'>
        <p className='text-base line-clamp-3'>{comment.text}</p>
        <CommentDialog text={comment.text} />
      </div>
    </div>
  );
};

export default CommentCardTour;
