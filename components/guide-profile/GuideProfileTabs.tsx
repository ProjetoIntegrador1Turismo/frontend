import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export async function GuideProfileTabs() {

  return (
    <Tabs defaultValue='itineraries' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
            Ola guia
        </h1>
        <img src='/avatar.jpg' className='w-[150px] h-[150px] rounded-full object-cover' />
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='itineraries'>
          Roteiros
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='reviews'>
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value='itineraries'>
        <p>Roteiros</p>
      </TabsContent>
      <TabsContent value='reviews'>
        <p>Reviews</p>
      </TabsContent>
    </Tabs>
  );
}
