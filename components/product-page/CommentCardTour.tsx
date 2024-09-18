import { format } from 'date-fns';
import Image from 'next/image';
import Rating from '../home-page/Rating';
import { CommentDialog } from '../profile-page/CommentDialog';

export interface Comment {
  id: number;
  text: string;
  wasVisitingDate: string;
  rating: number;
  tourist: Tourist;
}

export interface Tourist {
  id: number;
  touristName: string;
  profileImageUrl: string;
}

const CommentCardTour = ({ comment }: { comment: Comment }) => {
  return (
    <div className='w-[350px] h-[200px] border border-black rounded-xl shadow-md shadow-gray-400 p-4 flex flex-col gap-2'>
      <div className='flex gap-3'>
        <Image
          height={90}
          width={90}
          alt={comment.tourist.touristName}
          src={comment.tourist.profileImageUrl}
          className='w-[70px] h-[70px] rounded-full object-cover'
          draggable={false}
        />
        <div>
          <div className='flex gap-3 items-center'>
            <h1 className='text-xl font-bold truncate max-w-[150px]'>
              {comment.tourist.touristName}
            </h1>
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
