import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InterestPointForm from './InterestPointForm';
import GuideApproval from './GuideApproval';
import InterestPoints from './InterestPoints';

export async function AdminTabs() {
  return (
    <Tabs defaultValue='interestpoint' className='flex gap-4'>
      <TabsList className='flex flex-col h-fit gap-12 border border-black rounded-xl p-4'>
        <h1 className='font-bold text-3xl text-black break-words w-48 text-center'>
          <p>admin</p>
        </h1>
        <img src='/avatar.jpg' className='w-[150px] h-[150px] rounded-full object-cover' />
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='interestpoint'>
          Cadastrar Pontos
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='config'>
          Editar Pontos
        </TabsTrigger>
        <TabsTrigger className='rounded-xl shadow-md shadow-gray-400' value='guides'>
          Aprovar Guias
        </TabsTrigger>
      </TabsList>
      <TabsContent value='interestpoint'>
        <InterestPointForm />
      </TabsContent>
      <TabsContent value='config'>
        <InterestPoints />
      </TabsContent>
      <TabsContent value='guides'>
        <GuideApproval />
      </TabsContent>
    </Tabs>
  );
}
