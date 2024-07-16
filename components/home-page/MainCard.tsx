import { ClockIcon } from '@radix-ui/react-icons';
import BRLIcon from '@/components/icons/BRLIcon';
import styles from '@/styles/main-page/MainCard.module.css';
import Image from 'next/image';

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
      <Image
        className={styles.HomeCardImage}
        src={tour.image}
        width={385}
        height={260}
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
            <p className='tracking-[6px]'>$ $ $</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
