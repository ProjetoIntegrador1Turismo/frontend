import BRLIcon from '@/components/icons/BRLIcon';
import { ClockIcon } from '@radix-ui/react-icons';
import { DollarSignIcon } from 'lucide-react';
import styles from '@/styles/main-page/MainCard.module.css';

interface Tour {
  tourTitle: string;
  price: string;
  duration: string;
  image: string;
  imageAlt?: string;
}

interface MainCardProps {
  tour: Tour;
}

const MainCard = ({ tour }: MainCardProps) => {
  return (
    <div className={styles.HomeCardContainer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.HomeCardImage}
        src={tour.image}
        alt={tour.imageAlt ? tour.imageAlt : ''}
      />
      <div className={styles.DescriptionContainer}>
        <h1>{tour.tourTitle}</h1>
        <div className={styles.InfoContainer}>
          <div className={styles.DurationContainer}>
            <ClockIcon className={styles.ClockIcon} />
            <p>{tour.duration}</p>
          </div>
          <div className={styles.PriceContainer}>
            <BRLIcon className={styles.BRLIcon} />
            <p>$ $ $</p>
            {/* todo: implementar PriceCard */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
