import { SliderCardProps } from '@/lib/interfaces';
import styles from '@/styles/main-page/SliderCard.module.css';
import Link from 'next/link';
import Image from 'next/image';

const SliderCard = ({ image, title, id, type }: SliderCardProps) => {
  return (
    <div className={styles.CardContainer}>
      <Link href={`/${type}/${id}`}>
        <Image className={styles.CardImg} src={image} alt='' width={233} height={150} />
        <h1 className={styles.CardText}>{title}</h1>
      </Link>
    </div>
  );
};

export default SliderCard;
