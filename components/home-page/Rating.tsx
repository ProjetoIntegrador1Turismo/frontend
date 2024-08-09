import { RatingProps } from '@/lib/interfaces';
import OneStar from './OneStar';
import TwoStars from './TwoStars';
import ThreeStars from './ThreeStars';
import FourStars from './FourStars';
import FiveStars from './FiveStars';

const Rating = ({ rating }: RatingProps) => {
  switch (rating) {
    case 0:
      return <OneStar />;
    case 2:
      return <TwoStars />;
    case 3:
      return <ThreeStars />;
    case 4:
      return <FourStars />;
    case 5:
      return <FiveStars />;
  }
};

export default Rating;
