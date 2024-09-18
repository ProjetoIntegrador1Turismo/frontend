'use client';
import SearchBar from '../guide-panel/SearchBar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import InterestPointEditCard from './InterestPointEditCard';
import ClipLoader from 'react-spinners/ClipLoader';
import GuidePagination from './GuidePagination';

const InterestPointEdit = () => {
  const [filteredInterestPoints, setFilteredInterestPoints] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const { data: sessionData } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ['interestPoints'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8081/interestpoint', {
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

  if (isLoading)
    return (
      <div className='min-h-[40vh] h-fit mb-3 w-[667px] flex items-center justify-center'>
        <ClipLoader color='black' />
      </div>
    );
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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[316px]'>
        {currentItems.map((point: any) => (
          <InterestPointEditCard
            name={point.name}
            imageCoverUrl={point.imageCoverUrl}
            id={point.id}
            key={point.id}
          />
        ))}
      </div>
      <GuidePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => {
          if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        }}
        onPrevious={() => {
          if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
          }
        }}
      />
    </div>
  );
};

export default InterestPointEdit;
