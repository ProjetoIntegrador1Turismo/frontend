'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import InterestedTouristsTable from './InterestedTouristsTable';
import ClipLoader from 'react-spinners/ClipLoader';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

interface Tourist {
  tourist: {
    id: number;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
    profileImageUrl: string;
    phone: string | null;
  };
  itinerary: {
    id: number;
    title: string;
    imageCoverUrl: string;
  };
}

const InterestedTourists: FC = () => {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState<boolean>(true);
  const { data: sessionData } = useSession();

  useEffect(() => {
    const fetchTourists = async () => {
      try {
        const response = await axios.get('http://localhost:8081/guides/interestedTourists', {
          headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
        });
        setTourists(response.data);
      } catch (error) {
        console.error('Erro ao buscar turistas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTourists();
  }, [sessionData?.user.authToken]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tourists.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tourists.length / itemsPerPage);

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

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[75vh]'>
        <ClipLoader color='black' />
      </div>
    );
  }

  return (
    <div className='min-h-[75vh] w-[750px] h-fit'>
      <Card>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Turistas interessados</CardTitle>
        </CardHeader>
        <CardContent>
          {tourists.length > 0 ? (
            <InterestedTouristsTable
              tourists={currentItems}
              currentPage={currentPage}
              totalPages={totalPages}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          ) : (
            <p>Nenhum turista interessado no momento.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InterestedTourists;
