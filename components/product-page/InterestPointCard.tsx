type InterestPoint = {
    image: string;
    name: string;
  };
  
  const InterestPointCard = ({ point }: { point: InterestPoint }) => (
    <div className='w-48 h-32 bg-gray-200'>
      <img src={point.image} alt={point.name} className='w-full h-full object-cover'/>
      <span className='text-center block'>{point.name}</span>
    </div>
  );
  
  export default InterestPointCard;
  