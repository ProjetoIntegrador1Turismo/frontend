'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Review } from './Profile';
import { Button } from '../ui/button';
import ReviewCard from '../guide-profile/ReviewCard';
import ReviewCardProfile from './ReviewCardProfile';

const MyReviews = ({ reviews, profilePic }: { reviews: Review[]; profilePic: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const currentData = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <Card>
        <CardHeader>
          <CardTitle>Suas avaliações</CardTitle>
          <CardDescription>Aqui você encontra todos as suas avaliações de guia!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 grid-rows-3 gap-4'>
            {currentData.map((review) => {
              return <ReviewCardProfile review={{...review, avatarUrl: profilePic}} key={review.id} />;
            })}
          </div>
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

export default MyReviews;
