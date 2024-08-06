'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import SearchBar from '../guide-panel/SearchBar';
import InterestPointCard from './InterestPointCard';


interface InterestPoint {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
}

const InterestPoints: React.FC = () => {
  const [interestPoints, setInterestPoints] = useState<InterestPoint[]>([]);
  const [filteredInterestPoints, setFilteredInterestPoints] = useState<InterestPoint[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchInterestPoints = async () => {
      const data = [
        { id: 1, imageUrl: 'path-to-image1.jpg', name: 'InterestPoint1', type: 'Passeios' },
        { id: 2, imageUrl: 'path-to-image2.jpg', name: 'InterestPoint2', type: 'Passeios' },
        // Adicione mais dados conforme necessário
      ];
      setInterestPoints(data);
    };

    fetchInterestPoints();
  }, []);

  useEffect(() => {
    // Filtra os pontos de interesse com base no termo de pesquisa
    setFilteredInterestPoints(
      interestPoints.filter((point) =>
        point.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, interestPoints]);

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
        <CardTitle className="text-3xl font-bold text-center">Passeios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems.map((point) => (
            <InterestPointCard key={point.id} {...point} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
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

export default InterestPoints;
