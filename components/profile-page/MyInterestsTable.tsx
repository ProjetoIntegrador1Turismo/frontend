import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { InterestedItinerary } from './Profile';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ExternalLink, CircleXIcon } from 'lucide-react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { useSession } from 'next-auth/react';

interface MyInterestsTableProps {
  interestedItineraries: InterestedItinerary[];
  setInterestedItineraries: React.Dispatch<React.SetStateAction<InterestedItinerary[]>>; // Para atualizar a lista
}

const MyInterestsTable: React.FC<MyInterestsTableProps> = ({
  interestedItineraries,
  setInterestedItineraries
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const { toast } = useToast();
  const { data: sessionData } = useSession();

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(interestedItineraries.length / itemsPerPage);

  const currentData = interestedItineraries.slice(
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

  const handleRemoveInterest = async (itineraryId: number) => {
    try {
      await axios.delete(`http://localhost:8081/tourist/signal/${itineraryId}`,
        {
          headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
        }
        
      );
      toast({ title: 'Interesse removido com sucesso!', variant: 'destructive' });
      setInterestedItineraries((prev) =>
        prev.filter((itinerary) => itinerary.id !== itineraryId)
      );
    } catch (error) {
      toast({ title: 'Erro ao remover interesse', variant: 'destructive' });
      console.error('Erro ao remover interesse:', error);
    }
  };

  return (
    <div className='h-fit mb-3'>
      <TableContainer component={Paper} className='min-h-[495px]'>
        <Table sx={{ minWidth: 650 }} aria-label='itinerary table'>
          <TableHead>
            <TableRow>
              <TableCell>Guia</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Roteiro</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((itinerary, index) => (
              <TableRow key={`${itinerary.id}-${index}`}>
                <TableCell>
                  <Avatar src={itinerary.guide.profileImageUrl} alt={itinerary.title} />
                </TableCell>
                <TableCell>{itinerary.guide.firstName + ' ' + itinerary.guide.lastName}</TableCell>
                <TableCell>
                  <Link
                    href={`/itinerary/${itinerary.id}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center text-gray-700 hover:text-purple-500'
                  >
                    {itinerary.title}
                    <ExternalLink className='ml-2 h-4 w-4' />
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant='destructive'
                    onClick={() => handleRemoveInterest(itinerary.id)}
                  >
                    <CircleXIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {interestedItineraries.length !== 0 && (
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

export default MyInterestsTable;
