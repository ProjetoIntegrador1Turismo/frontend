'use client';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SearchBar from '../guide-panel/SearchBar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import InterestPointPaginatedCard from './InterestPointPaginatedCard';
import { DialogClose } from '@/components/ui/dialog';
import ClipLoader from 'react-spinners/ClipLoader';

interface InterestPoint {
  id: number;
  name: string;
  address: {
    road: string;
    number: string;
    zipCode: string | null;
  } | null;
  averageValue: number | null;
  shortDescription: string | null;
  longDescription: string | null;
  starsNumber: number | null;
  isResort: boolean | null;
  breakfastIncluded: boolean | null;
  foodType: string | null;
  date: string | null;
  duration: string | null;
  requiredAge: number | null;
  imageCoverUrl: string;
}

interface InterestPointsPageProps {
  type: string;
  title?: string;
  addInterestPoint: (id: number) => void;
}
const apiTypeMap: Record<string, string> = {
  event: 'event',
  experience: 'experience',
  touristpoint: 'tourist_point',
  hotel: 'hotel',
  restaurant: 'restaurant'
};

const InterestPointPaginated: React.FC<InterestPointsPageProps> = ({
  type,
  title,
  addInterestPoint
}) => {
  const [filteredInterestPoints, setFilteredInterestPoints] = useState<InterestPoint[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const { data: sessionData } = useSession();

  const { data, error, isLoading } = useQuery<InterestPoint[], Error>({
    queryKey: ['interestPoints', type],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:8081/interestpoint/type?type=${apiTypeMap[type]}`,
        {
          headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (data) {
      setFilteredInterestPoints(
        data.filter((point) => point.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }, [searchTerm, data]);

  if (isLoading)
    return (
      <div className='min-h-[35vh] h-fit mb-3 w-[1267px] flex items-center justify-center'>
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-3xl font-bold text-center'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='mb-4'>
          <SearchBar
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {currentItems.map((point) => (
            <DialogClose>
              <InterestPointPaginatedCard
                key={point.id}
                id={point.id}
                imageCoverUrl={point.imageCoverUrl}
                name={point.name}
                onClick={() => addInterestPoint(point.id)}
              />
            </DialogClose>
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
      </CardContent>
    </Card>
  );
};

export default InterestPointPaginated;
