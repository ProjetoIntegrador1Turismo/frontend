'use client';
import React, { useState } from 'react';
import { Review } from './GuideProfileTabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import ReviewCard from './ReviewCard';
import { ReviewFormDialog } from './ReviewFormDialog';
import { Button } from '../ui/button';
import SearchBar from './SearchBar';
import { useDebounce } from 'use-debounce';

const GuideReviews = ({
  reviews,
  guideId,
  guideName,
  userType
}: {
  reviews: Review[];
  guideId: number;
  guideName: string;
  userType: string | undefined;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [query] = useDebounce(searchTerm, 500);
  const itemsPerPage = 6;

  const handleSearchChange = (text: string) => {
    setSearchTerm(text);
    setCurrentPage(1);
  };

  const filteredReviews = reviews.filter((review) =>
    review.touristName.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  const currentData = filteredReviews.slice(
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

  if (reviews.length === 0) {
    return (
      <div className='min-h-[75vh] h-fit w-fit'>
        <Card>
          <CardHeader>
            <CardTitle>Reviews do guia</CardTitle>
            <CardDescription>
              Aqui você encontra todos as avaliações que {guideName} recebeu!
            </CardDescription>
            {userType && userType !== 'Guide' && (
              <ReviewFormDialog guideId={guideId} guideName={guideName} />
            )}
          </CardHeader>
          <CardContent className='grid grid-cols-3 grid-rows-2 gap-4'>
            <div className='w-[500px] flex items-center flex-col'>
              <div className='w-fit flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold bg-gradient-to-r from-tl-red to-tl-purple bg-clip-text text-transparent'>
                  Que vazio...
                </h1>
                <p className='text-sm text-center'>Esse guia não recebeu avaliações... ainda!</p>
                <p className='text-sm w-[300px] text-center'>
                  Se você já fez uma viagem com {guideName}, por favor, escreva uma avaliação!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-[75vh] h-fit w-fit'>
      <Card>
        <CardHeader>
          <CardTitle>Reviews do guia</CardTitle>
          <CardDescription>
            Aqui você encontra todos as avaliações que {guideName} recebeu!
          </CardDescription>
          <div className='flex justify-between items-center'>
            {userType && userType !== 'Guide' && (
              <ReviewFormDialog guideId={guideId} guideName={guideName} />
            )}
            <SearchBar setText={handleSearchChange} text={searchTerm} />
          </div>
        </CardHeader>
        <CardContent className='grid grid-cols-3 grid-rows-2 gap-4'>
          {currentData.map((review) => {
            return <ReviewCard review={review} key={review.id} />;
          })}
        </CardContent>
        <CardFooter>
          <div className='flex items-center justify-center w-full gap-4'>
            <Button
              className='bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none'
              onClick={handlePrevious}
              disabled={currentPage === 1 || currentData.length === 0}
            >
              Anterior
            </Button>
            <p>
              {currentPage} de {totalPages}
            </p>
            <Button
              className='bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none'
              onClick={handleNext}
              disabled={currentPage === totalPages || currentData.length === 0}
            >
              Próximo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GuideReviews;
