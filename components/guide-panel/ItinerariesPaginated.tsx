'use client';
import SearchBar from '../guide-panel/SearchBar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ItineraryCard from './ItineraryCard';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button } from '../ui/button';

const ItinerariesPaginated = () => {
  const [filteredInterestPoints, setFilteredInterestPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const { data: sessionData } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ['guideItineraries', sessionData?.user.email],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8081/guides/itineraries', {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
      return response.data;
    },
    refetchOnWindowFocus: true
  });

  useEffect(() => {
    if (data) {
      setFilteredInterestPoints(
        data.filter((point: any) => point.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }, [searchTerm, data]);

  if (isLoading)
    return (
      <div className='min-h-[45vh] h-fit mb-3 w-[500px] flex items-center justify-center'>
        <ClipLoader color='black' />
      </div>
    );
  if (error)
    return (
      <p>
        error <pre className='max-w-[500px]'>{JSON.stringify(error, null, 2)}</pre>
      </p>
    );

  if (data.length === 0) {
    return (
      <div className='w-[500px] flex items-center flex-col'>
        <div className='w-fit flex flex-col items-center justify-center'>
          <h1 className='text-xl'>🌍✨</h1>
          <p className='text-sm w-1/2'>
            Parece que ainda não há nenhum roteiro criado por aqui. Que tal começar a planejar uma
            nova aventura agora mesmo?.{' '}
          </p>
        </div>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredInterestPoints.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredInterestPoints.length / itemsPerPage);

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

  return (
    <div>
      <div className='mb-4'>
        <SearchBar
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className='grid grid-cols-3 w-fit gap-4'>
        {currentItems.map((point: any) => (
          <ItineraryCard
            id={point.id}
            imageCoverUrl={point.imageCoverUrl}
            name={point.title}
            key={point.id}
          />
        ))}
      </div>

      {filteredInterestPoints.length !== 0 && (
        <div className='flex items-center justify-center w-full gap-4 mt-4'>
          <Button
            className='bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none'
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <p>
            {currentPage} de {totalPages}
          </p>
          <Button
            className='bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none'
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  );
};

export default ItinerariesPaginated;
