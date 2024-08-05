'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ItineraryCard from './ItineraryCard';
import SearchBar from './SearchBar';

interface Itinerary {
  id: number;
  imageUrl: string;
  title: string;
}

const ItineraryDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();
  const itineraries: Itinerary[] = [
    { id: 1, imageUrl: 'path-to-image1.jpg', title: 'Foz do Iguaçu: 7 dias com...' },
    { id: 2, imageUrl: 'path-to-image2.jpg', title: 'Rio de Janeiro: 5 dias de...' }
    // Adicione mais dados conforme necessário
  ];

  const filteredItineraries = itineraries.filter((itinerary) =>
    itinerary.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mx-auto px-4'>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Meus roteiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
            <Button
              className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'
              onClick={() => router.push('/novo-itinerario')}
            >
              Criar novo
            </Button>
            {/* comentário gui: não sei que parametro loco é esse da searchbar tive que pesquisar como faz uma no chat gpt */}
            <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {filteredItineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.id} {...itinerary} />
            ))}
          </div>
        </CardContent>
        <CardFooter className='flex justify-center mt-4'>
          <div className='flex space-x-2'>
            <button className='px-3 py-1 rounded-full bg-gray-200'>1</button>
            <button className='px-3 py-1 rounded-full bg-gray-200'>2</button>
            <button className='px-3 py-1 rounded-full bg-gray-200'>3</button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ItineraryDashboard;
