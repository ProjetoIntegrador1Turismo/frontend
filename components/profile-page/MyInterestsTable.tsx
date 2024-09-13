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
import { ExternalLink } from 'lucide-react';

interface MyInterestsTableProps {
  interestedItineraries: InterestedItinerary[];
}

const MyInterestsTable: React.FC<MyInterestsTableProps> = ({ interestedItineraries }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

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

  return (
    <div className='w-[802px] min-h-[75vh] h-fit mb-3'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='itinerary table'>
          <TableHead>
            <TableRow>
              <TableCell>Guia</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Roteiro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((itinerary, index) => (
              <TableRow key={`${itinerary.id}-${index}`}>
                <TableCell>
                  <Avatar src={itinerary.guide.profileImageUrl} alt={itinerary.title} />
                </TableCell>
                <TableCell>{itinerary.guide.firstName + " " + itinerary.guide.lastName}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </div>
  );
};

export default MyInterestsTable;
