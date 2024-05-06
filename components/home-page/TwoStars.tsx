import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';

const TwoStars = () => {
  return (
    <div className='flex'>
      <StarFilledIcon height={20} width={20} />
      <StarFilledIcon height={20} width={20} />
      <StarIcon height={20} width={20} />
      <StarIcon height={20} width={20} />
      <StarIcon height={20} width={20} />
    </div>
  );
};

export default TwoStars;
