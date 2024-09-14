import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

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

interface InterestedTouristsTableProps {
  tourists: Tourist[];
  currentPage: number;
  totalPages: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const InterestedTouristsTable: React.FC<InterestedTouristsTableProps> = ({
  tourists,
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
}) => {
  return (
    <div className="h-fit mb-3">
      <TableContainer component={Paper} className="min-h-[495px]">
        <Table sx={{ minWidth: 650 }} aria-label="interested tourists table">
          <TableHead>
            <TableRow>
              <TableCell>Foto</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Contatos</TableCell>
              <TableCell>Roteiro de Interesse</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tourists.map((entry, index) => (
              <TableRow key={`${entry.tourist.id}-${index}`}>
                <TableCell>
                  <Avatar
                    src={entry.tourist.profileImageUrl}
                    alt={entry.tourist.firstName}
                  />
                </TableCell>
                <TableCell>{`${entry.tourist.firstName} ${entry.tourist.lastName}`}</TableCell>
                <TableCell>
                  <p>{entry.tourist.email}</p>
                  <p>{entry.tourist.phone || 'Telefone não informado'}</p>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/itinerary/${entry.itinerary.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 hover:text-purple-500"
                  >
                    {entry.itinerary.title}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {tourists.length !== 0 && (
        <div className="flex items-center justify-center w-full gap-4 mt-4">
          <Button
            className="bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <p>
            {currentPage} de {totalPages}
          </p>
          <Button
            className="bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none"
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

export default InterestedTouristsTable;
