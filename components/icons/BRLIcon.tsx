import Image from 'next/image';

const BRLIcon = ({ className }: { className: string }) => {
  return (
    <Image
      className={className}
      src={'/BRLIcon.png'}
      alt='Brazillian currency icon'
      width={15}
      height={15}
    />
  );
};

export default BRLIcon;
