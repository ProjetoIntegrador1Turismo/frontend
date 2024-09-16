import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Itineraries from './ItinerariesPaginated';
import NewItineraryForm from './NewItineraryForm';
import InterestedTourists from './InterestedTourists';
import { getAuthToken } from '@/api/service';
import ItinerariesPaginated from './ItinerariesPaginated';
import MyItineraries from './MyItineraries';
import { auth } from '@/auth';
import Image from 'next/image';
import { Book, BookPlus, BookUser} from 'lucide-react';

export async function GuideTabs() {
  const session = await auth();
  return (
    <Tabs defaultValue='itineraries' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
          <p>Guia</p>
        </h1>
        <Image
          alt={session?.user.firstName ?? ''}
          className='w-[150px] h-[150px] rounded-full object-cover'
          height={150}
          width={150}
          src={session?.user.profileImageUrl ?? ''}
        />
        <p>Cadastur: {session?.user.cadasturCode}</p>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='itineraries'>
          <Book /> | Meus roteiros
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='newItinerary'>
          <BookPlus /> | Novo Roteiro
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='tourists'>
          <BookUser /> | Turistas interessados
        </TabsTrigger>
      </TabsList>
      <TabsContent value='itineraries'>
        <MyItineraries />
      </TabsContent>
      <TabsContent value='newItinerary'>
        <NewItineraryForm />
      </TabsContent>
      <TabsContent value='tourists'>
        <InterestedTourists />
      </TabsContent>
    </Tabs>
  );
}
