import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Itineraries from './ItinerariesPaginated';
import NewItineraryForm from './NewItineraryForm';
import InterestedTourists from './InterestedTourists';
import { getAuthToken } from '@/api/service';

export async function GuideTabs() {
  return (
    <Tabs defaultValue='itineraries' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
          <p>Guia</p>
        </h1>
        {/* <img src='/avatar.jpg' className='w-[150px] h-[150px] rounded-full object-cover' /> */}
        <p>Cadastur: guide.cadasturCode</p>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='itineraries'>
          Meus roteiros
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='newItinerary'>
          Novo Roteiro
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='tourists'>
          Turistas interessados
        </TabsTrigger>
      </TabsList>
      <TabsContent value='itineraries'>
        <div className='h-[85vh]'>
        </div>
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
