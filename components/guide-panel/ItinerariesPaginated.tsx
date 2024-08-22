'use client';
import SearchBar from '../guide-panel/SearchBar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ItineraryCard from './ItineraryCard';

const ItinerariesPaginated = () => {
  const [filteredInterestPoints, setFilteredInterestPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const { data: sessionData } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ['guideItineraries', sessionData?.user.email],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8081/guides/itineraries`, {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
      return response.data;
    },
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (data) {
      setFilteredInterestPoints(
        data.filter((point: any) => point.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }, [searchTerm, data]);

  if (isLoading) return <p>Buscando...</p>;
  if (error)
    return (
      <p>
        error <pre>{JSON.stringify(error, null, 2)}</pre>
      </p>
    );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredInterestPoints.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredInterestPoints.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {currentItems.map((point: any) => (
          <ItineraryCard id={point.id} imageCoverUrl={point.imageCoverUrl} name={point.title} />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 mx-1 rounded-full ${currentPage === i + 1 ? 'bg-gray-400' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItinerariesPaginated;
