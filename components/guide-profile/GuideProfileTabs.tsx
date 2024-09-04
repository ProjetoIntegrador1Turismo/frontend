import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axios from 'axios';
import { redirect } from 'next/navigation';
import GuideItineraries from './GuideItineraries';
import GuideReviews from './GuideReviews';

export interface GuideProfilePageSource {
  id: number
  firstName: string
  lastName: string
  cadasturCode: string
  averageRating: any
  profileImageUrl: string
  reviews: Review[]
  itineraries: Itinerary[]
}

export interface Itinerary {
  id: number
  title: string
  imageCoverUrl: string
}

export interface Review {
  touristName: string
  avatarUrl: string
  id: number
  text: string
  date: string
  rating: number
}

export async function GuideProfileTabs({id}: { id: number }) {
  let guideData: GuideProfilePageSource;
  try {
    const request = await axios.get<GuideProfilePageSource>(`http://localhost:8081/page-source/guide/${id}`);
    guideData = request.data;
  } catch (error) {
    redirect('/');
  }

  return (
    <Tabs defaultValue='itineraries' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>{`${guideData.firstName} ${guideData.lastName}`}</h1>
        <img src={guideData.profileImageUrl} className='w-[150px] h-[150px] rounded-full object-cover select-none' draggable={false} />
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='itineraries'>
          Roteiros
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='reviews'>
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value='itineraries'>
        <GuideItineraries itineraries={guideData.itineraries} />
      </TabsContent>
      <TabsContent value='reviews'>
        <GuideReviews reviews={guideData.reviews} />
      </TabsContent>
    </Tabs>
  );
}
