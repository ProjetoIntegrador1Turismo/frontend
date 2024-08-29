import InterestPointCard from '@/components/categories/InterestPointCard';
import BondeDivisor from '@/components/home-page/BondeDivisor';
import PeopleDivisor from '@/components/home-page/PeopleDivisor';
import PlaneDivisor from '@/components/home-page/PlaneDivisor';
import CommentCard from '@/components/product-page/CommentCard';
import TourGallery from '@/components/product-page/Gallery';
import GuideCardTour from '@/components/product-page/GuideCardTour';
import Title from '@/components/product-page/Title';
import TourDescription from '@/components/product-page/TourDescription';
import axios from 'axios';
import { redirect } from 'next/navigation';

// MOCKS:
const tourTitleMock = {
  title: 'Roteiro Primeira vez em Foz do Iguaçu',
  description:
    'Esse é um roteiro incrível para quem está visitando Foz do Iguaçu pela primeira vez. Aproveite as melhores atrações com um guia experiente.'
};

const mockGuides = {
  firstName: 'Guia 1'
};

const mockInterestPoints = [
  {
    image: 'https://i.imgur.com/Aex3UZm.jpeg',
    name: 'Parque das Aves'
  },
  {
    image: 'https://i.imgur.com/Aex3UZm.jpeg',
    name: 'Cataratas do Iguaçu'
  },
  {
    image: 'https://i.imgur.com/Aex3UZm.jpeg',
    name: 'Marco das Três Fronteiras'
  },
  {
    image: 'https://i.imgur.com/Aex3UZm.jpeg',
    name: 'Itaipu Binacional'
  }
];

const mockComments = [
  {
    avatar: 'https://i.imgur.com/Aex3UZm.jpeg',
    name: 'Fulano de Tal',
    date: '01/01/2021',
    text: 'Esse roteiro é incrível, recomendo muito!'
  },
  {
    avatar: 'https://i.imgur.com/Aex3UZm.jpeg',
    name: 'Beltrano de Tal',
    date: '01/01/2021',
    text: 'Esse roteiro é incrível, recomendo muito!'
  },
  {
    avatar: 'https://i.imgur.com/Aex3UZm.jpeg',
    name: 'Ciclano de Tal',
    date: '01/01/2021',
    text: 'Esse roteiro é incrível, recomendo muito!'
  }
];

export interface ItineraryPageSource {
  guide: Guide
  itinerary: Itinerary
  reviews: any[]
}

export interface Guide {
  id: number
  firstName: string
  cadasturCode: string
  averageRating: any
}

export interface Itinerary {
  id: number
  title: string
  description: string
  mediumCost: number
  days: number
  interestPoints: InterestPoint[]
}

export interface InterestPoint {
  id: number
  name: string
  shortDescription: string
  imageCoverUrl: string
  interestPointType: string
}


const ItineraryPage = async ({ params }: { params: { id: string } }) => {
  try {
    Number(params.id);
  } catch (error) {
    redirect('/');
  }
  let itineraryData: ItineraryPageSource;
  try {
    const request = await axios.get(`http://localhost:8081/page-source/itinerary/${params.id}`);
    itineraryData = request.data as ItineraryPageSource;
  } catch (error) {
    redirect('/');
  }

  return (
    <div className='h-fit flex flex-col mb-12 gap-8'>
      <div className='flex justify-center'></div>
      <div className='overflow-hidden text-center flex flex-col gap-3'>
        <h1 className='font-semibold text-5xl truncate leading-[1.2]'>
          {itineraryData.itinerary.title}
        </h1>
        <p className='select-none text-3xl font-light'>R${itineraryData.itinerary.mediumCost},00 | {itineraryData.itinerary.days} dias</p>
      </div>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <p className='text-xl text-center'>Ofertado por:</p>
        <GuideCardTour
          img='https://i.imgur.com/Aex3UZm.jpeg'
          name={itineraryData.guide.firstName}
          rating={itineraryData.guide.averageRating ?? 3}
        />
      </div>

      <PlaneDivisor />

      <TourGallery
        imgCover={'https://i.imgur.com/Aex3UZm.jpeg'}
        images={[
          'https://i.imgur.com/Aex3UZm.jpeg',
          'https://i.imgur.com/Aex3UZm.jpeg',
          'https://i.imgur.com/Aex3UZm.jpeg',
          'https://i.imgur.com/Aex3UZm.jpeg',
          'https://i.imgur.com/Aex3UZm.jpeg'
        ]}
      />

      <TourDescription shortDescription='dfaksiodjasiodasjio' longDescription='1234132421' />

      <BondeDivisor />

      {/* Atrações incluídas no roteiro */}
      <div className='flex flex-wrap justify-center gap-4'>
        {mockInterestPoints.map((point, index) => (
          <InterestPointCard
            key={index}
            id={1}
            name='point '
            imageCoverUrl='https://i.imgur.com/Aex3UZm.jpeg'
            shortDescription='adsasd'
            type={'tour'}
          />
        ))}
      </div>

      <PeopleDivisor />

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
