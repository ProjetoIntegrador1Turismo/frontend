import ProductButton from '@/components/product-page/ProductButton';
import Title from '@/components/product-page/Title';
import { tourTitleMock } from '@/lib/mocks';

const TourPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='h-[75vh]'>
      <div className='flex justify-between items-center'>
        <Title tour={tourTitleMock} />
        <ProductButton />
      </div>
      <p>{params.id}</p>
    </div>
  );
};

export default TourPage;
