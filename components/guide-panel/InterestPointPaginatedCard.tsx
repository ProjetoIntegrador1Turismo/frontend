import Image from 'next/image';

const InterestPointPaginatedCard = ({
  imageCoverUrl,
  name,
  onClick
}: {
  imageCoverUrl: string;
  name: string;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick}>
      <div className='h-[150px] max-w-[250px]'>
        <Image
          className='w-[300px] h-[100px] rounded-t-xl object-cover'
          src={imageCoverUrl}
          alt={name}
          width={300}
          height={300}
        />
        <div className='bg-gradient-to-r from-tl-red to-tl-purple rounded-b-xl flex items-center justify-center'>
          <h1 className='text-white text-xl font-bold p-3 truncate max-w-[300px]'>{name}</h1>
        </div>
      </div>
    </button>
  );
};

export default InterestPointPaginatedCard;
