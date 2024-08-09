import Link from 'next/link';

interface InterestPointCardProps {
  id: number;
  name: string;
  address: {
    road: string;
    number: string;
    zipCode: string | null;
  } | null;
  shortDescription: string | null;
  imageCoverUrl: string;
}

const InterestPointCard: React.FC<InterestPointCardProps> = ({ id, name, address, shortDescription, imageCoverUrl }) => {
  return (
    <Link href={`/interestpoint/${id}`}>
      <div className='relative border rounded-md shadow-md cursor-pointer'>
        <img
          src={imageCoverUrl}
          alt={name}
          className='w-full h-32 object-cover rounded-t-md'
        />
        <div className='p-2'>
          <p className='text-center font-bold'>{name}</p>
          {address && (
            <p className='text-center text-sm text-gray-500'>
              {address.road}, {address.number}
            </p>
          )}
          {shortDescription && (
            <p className='text-center text-sm'>{shortDescription}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default InterestPointCard;
