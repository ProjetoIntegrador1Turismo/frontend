import styles from '@/styles/main-page/SliderCard.module.css';
import { SliderCardProps } from '@/lib/interfaces';
import Link from 'next/link';

const SliderCard = ({ image, title }: SliderCardProps) => {
  return (
    <div className={styles.CardContainer}>
      <Link href='/login'>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img className={styles.CardImg} src={image} alt='' />
        <h1 className={styles.CardText}>{title}</h1>
      </Link>
    </div>
  );
};

export default SliderCard;
