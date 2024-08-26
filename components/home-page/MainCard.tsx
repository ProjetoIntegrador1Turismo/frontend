import { ClockIcon } from '@radix-ui/react-icons';
import BRLIcon from '@/components/icons/BRLIcon';
import styles from '@/styles/main-page/MainCard.module.css';
import Image from 'next/image';
import { Top3InterestPoint } from '@/lib/interfaces';
import Link from 'next/link';
import Price from './Price';

interface MainCardProps {
  tour: Top3InterestPoint;
}

const MainCard = ({ tour }: MainCardProps) => {
  return (
    <Link href={`/tour/${tour.id}`}>
      <div className={styles.HomeCardContainer}>
        <Image
          className={styles.HomeCardImage}
          src={tour.imageCoverUrl}
          width={385}
          height={260}
          alt={tour.name}
        />
        <div className={styles.DescriptionContainer}>
          <h1>{tour.name}</h1>
          <div className={styles.InfoContainer}>
            <div className={styles.DurationContainer}>
              <ClockIcon className={styles.ClockIcon} />
              <p>{tour.duration}</p>
            </div>
            <div className={styles.PriceContainer}>
              <BRLIcon className={styles.BRLIcon} />
              <Price price={tour.averageValue} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MainCard;
