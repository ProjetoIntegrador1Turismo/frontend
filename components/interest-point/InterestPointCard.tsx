interface InterestPointCardProps {
    id: number;
    imageUrl: string;
    name: string;
    type: string;
  }
  
  const InterestPointCard: React.FC<InterestPointCardProps> = ({ imageUrl, name }) => {
    return (
      <div className='relative border rounded-md shadow-md'>
        <img
          src={imageUrl}
          alt={name}
          className='w-full h-32 object-cover rounded-t-md'
        />
        <div className='p-2'>
          <p className='text-center'>{name}</p>
        </div>
      </div>
    );
  };
  
  export default InterestPointCard;
  