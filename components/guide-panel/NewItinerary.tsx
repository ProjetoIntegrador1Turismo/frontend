'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
import SearchBar from './SearchBar';

interface InterestPoint {
  id: number;
  imageUrl: string;
  name: string;
}

const NewItinerary: React.FC = () => {
  const [selectedInterestPoints, setSelectedInterestPoints] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const interestPoints: InterestPoint[] = [
    { id: 1, imageUrl: 'path-to-image1.jpg', name: 'InterestPointX' },
    { id: 2, imageUrl: 'path-to-image2.jpg', name: 'InterestPointY' },
    // Adicione mais pontos de interesse conforme necessário
  ];

  const filteredInterestPoints = interestPoints.filter((point) =>
    point.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (id: number) => {
    setSelectedInterestPoints((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((pointId) => pointId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Card className="max-w-5xl mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Novo Roteiro / editar roteiro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Titulo"
            className="px-4 py-2 border rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Custo médio"
            className="px-4 py-2 border rounded-md w-full"
          />
          <input
            type="number"
            placeholder="Dias"
            className="px-4 py-2 border rounded-md w-full"
          />
          <div className="col-span-2">
            <label className="block mb-2">Selecionar imagem de capa</label>
            <input
              type="file"
              className="border rounded-md p-2 w-full"
            />
            <small className="text-gray-500">(Res. recomendada: 0000x0000)</small>
          </div>
          <textarea
            placeholder="Descrição"
            className="col-span-2 px-4 py-2 border rounded-md w-full h-32"
          ></textarea>
        </div>

        <div className="mb-4">
          <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredInterestPoints.map((point) => (
            <div key={point.id} className="relative border rounded-md shadow-md">
              <img src={point.imageUrl} alt={point.name} className="w-full h-32 object-cover rounded-t-md" />
              <div className="p-2">
                <p className="text-center">{point.name}</p>
              </div>
              <input
                type="checkbox"
                className="absolute top-2 right-2"
                checked={selectedInterestPoints.includes(point.id)}
                onChange={() => handleCheckboxChange(point.id)}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-full bg-gray-200">1</button>
          <button className="px-3 py-1 rounded-full bg-gray-200">2</button>
          <button className="px-3 py-1 rounded-full bg-gray-200">3</button>
        </div>
        <Button className="bg-gradient-to-r from-tl-red to-tl-purple w-fit">Salvar Roteiro</Button>
      </CardFooter>
    </Card>
  );
};

export default NewItinerary;
