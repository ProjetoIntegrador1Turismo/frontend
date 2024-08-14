import React from 'react';
import Title from '../../components/product-page/Title';
import ProductButton from '../../components/product-page/ProductButton';
import TourGallery from '../../components/product-page/Gallery';
import TourDescription from '../../components/product-page/TourDescription';
import GuideCardTour from '../../components/product-page/GuideCardTour';
import PlaneDivider from '../../components/home-page/PlaneDivisor';
import InterestPointCard from '../../components/product-page/InterestPointCard';
import CommentCard from '@/components/product-page/CommentCard';

// MOCKS:
const tourTitleMock = {
  title: 'Roteiro Primeira vez em Foz do Iguaçu',
  description: 'Esse é um roteiro incrível para quem está visitando Foz do Iguaçu pela primeira vez. Aproveite as melhores atrações com um guia experiente.',
};

const mockGuides = {
  firstName: 'Guia 1',
}

const mockInterestPoints = [
  {
    image: 'https://via.placeholder.com/150',
    name: 'Parque das Aves',
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Cataratas do Iguaçu',
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Marco das Três Fronteiras',
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'Itaipu Binacional',
  },
];

const mockComments = [
  {
    avatar: 'https://via.placeholder.com/150',
    name: 'Fulano de Tal',
    date: '01/01/2021',
    text: 'Esse roteiro é incrível, recomendo muito!',
  },
  {
    avatar: 'https://via.placeholder.com/150',
    name: 'Beltrano de Tal',
    date: '01/01/2021',
    text: 'Esse roteiro é incrível, recomendo muito!',
  },
  {
    avatar: 'https://via.placeholder.com/150',
    name: 'Ciclano de Tal',
    date: '01/01/2021',
    text: 'Esse roteiro é incrível, recomendo muito!',
  },
];

const ItineraryPage = async ({ params }: { params: { id: string } }) => {
  return (
    <div className='h-fit flex flex-col mb-12 gap-8'>
      <div className='flex justify-between items-center'>
        <Title tour={tourTitleMock} />
      </div>
      
      {/* Informações do roteiro */}
      <div className='flex justify-between items-center'>
        <span className='text-2xl font-bold'>R$3000</span>
        <span className='text-xl'>5 dias</span>
      </div>
      
      <div className='flex justify-between items-center'>
        <GuideCardTour guide={mockGuides[0]} />
        {/* <ProductButton text="Tenho Interesse!" /> */}
      </div>
      
      <PlaneDivider />

      <TourGallery />

      <TourDescription description={tourTitleMock.description} />
      
      <PlaneDivider />
      
      {/* Atrações incluídas no roteiro */}
      <div className='flex flex-wrap justify-center gap-4'>
        {mockInterestPoints.map((point, index) => (
          <InterestPointCard key={index} point={point} />
        ))}
      </div>
      
      <PlaneDivider />

      {/* Comentários */}
      <div className='flex flex-col gap-4'>
        <h2 className='text-3xl font-semibold'>O que as pessoas acham desse roteiro?</h2>
        <div className='flex flex-wrap justify-center gap-4'>
          {mockComments.map((comment, index) => (
            <CommentCard key={index} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
