'use client';
import { useState } from 'react';
import { Itinerary } from './GuideProfileTabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import GuideItineraryCard from './GuideItineraryCard';
import { useDebounce } from 'use-debounce';
import { Button } from '../ui/button';
import SearchBar from './SearchBar';

const GuideItineraries = ({ itineraries }: { itineraries: Itinerary[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [query] = useDebounce(searchTerm, 500);
  const itemsPerPage = 10;

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    setCurrentPage(1);
  };

  const filteredItineraries = itineraries.filter((itinerary) =>
    itinerary.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItineraries.length / itemsPerPage);

  const currentData = filteredItineraries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (itineraries.length === 0) {
    return (
      <div className='min-h-[75vh] h-fit'>
        <Card>
          <CardHeader>
            <CardTitle>Roteiros do guia</CardTitle>
            <CardDescription>
              Aqui você encontra todos os roteiros que esse guia oferece!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-[500px] flex items-center flex-col'>
              <div className='w-fit flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold bg-gradient-to-r from-tl-red to-tl-purple bg-clip-text text-transparent'>
                  Que vazio...
                </h1>
                <p className='text-sm text-center w-1/2'>
                  Este guia ainda não possui roteiros disponíveis no momento. Volte em breve para
                  explorar novas aventuras!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-[75vh] h-fit'>
      <Card>
        <CardHeader>
          <div className='flex justify-between'>
            <div>
              <CardTitle>Roteiros do guia</CardTitle>
              <CardDescription>
                Aqui você encontra todos os roteiros que esse guia oferece!
              </CardDescription>
            </div>
            <SearchBar setText={handleSearchChange} text={searchTerm} />
          </div>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-5 grid-rows-2 gap-4'>
            {currentData.map((item) => (
              <GuideItineraryCard
                id={item.id}
                key={item.id}
                name={item.title}
                imageCoverUrl={item.imageCoverUrl}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex items-center justify-center w-full gap-4'>
            <Button
              className='bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none'
              onClick={handlePrevious}
              disabled={currentPage === 1 || currentData.length === 0}
            >
              Anterior
            </Button>
            <p>
              {currentPage} de {totalPages}
            </p>
            <Button
              className='bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none'
              onClick={handleNext}
              disabled={currentPage === totalPages || currentData.length === 0}
            >
              Próximo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GuideItineraries;
