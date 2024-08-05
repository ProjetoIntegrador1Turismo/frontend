'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Tourist {
  id: number;
  name: string;
  contact: string;
  itineraryInterest: string;
}

const InterestedTourists: React.FC = () => {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // SOMENTE PRA VER COMO FICA REMOVER DEPOIS E FAZER IGUAL A FUNCAO DO PAINEL DO ADMIN
  useEffect(() => {
    const fetchTourists = async () => {
      const data = [
        {
          id: 1,
          name: 'Chat chunguete',
          contact: 'chungao@gmail.com',
          itineraryInterest: 'Foz do Iguaçu: 7 dias'
        },
        {
          id: 2,
          name: 'Calvo do karaio',
          contact: 'calvoo@docs.com',
          itineraryInterest: 'Rio de Janeiro: 5 dias'
        }
        // Adicione mais dados conforme necessário
      ];
      setTourists(data);
    };

    fetchTourists();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tourists.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tourists.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>Turistas interessados</CardTitle>
      </CardHeader>
      <CardContent>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='border p-2'>Nome</th>
              <th className='border p-2'>Contato</th>
              <th className='border p-2'>Roteiro de Interesse</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((tourist) => (
              <tr key={tourist.id} className='even:bg-gray-50'>
                <td className='border p-2'>{tourist.name}</td>
                <td className='border p-2'>{tourist.contact}</td>
                <td className='border p-2'>{tourist.itineraryInterest}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default InterestedTourists;
