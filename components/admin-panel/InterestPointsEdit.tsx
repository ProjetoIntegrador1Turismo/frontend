'use client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SearchBar from '../guide-panel/SearchBar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { DialogClose } from '@/components/ui/dialog';
import InterestPointEditCard from './InterestPointEditCard';

const InterestPointEdit = () => {
  const [filteredInterestPoints, setFilteredInterestPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const { data: sessionData } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ['interestPoints'],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8081/interestpoint`, {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
      return response.data;
    },
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (data) {
      setFilteredInterestPoints(
        data.filter((point: any) => point.name.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <SearchBar value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1)}} />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {currentItems.map((point: any) => (
          <InterestPointEditCard name={point.name} imageCoverUrl={point.imageCoverUrl} id={point.id} />
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

export default InterestPointEdit;
