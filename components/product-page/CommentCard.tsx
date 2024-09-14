type Comment = {
  avatar: string;
  touristName: string;
  date: string;
  text: string;
};

type CommentProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentProps) => (
  <div className='w-60 bg-white p-4 shadow-md rounded-lg'>
    <div className='flex items-center mb-2'>
      <img src={comment.avatar} className='w-10 h-10 rounded-full' />
      <div className='ml-4'>
        <span className='block font-semibold'>{comment.touristName}</span>
        <span className='block text-sm text-gray-500'>{comment.date}</span>
      </div>
    </div>
    <div className='text-gray-700'>{comment.text}</div>
  </div>
);

export default CommentCard;
