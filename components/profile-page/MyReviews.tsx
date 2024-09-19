'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Review } from './Profile';
import { Button } from '../ui/button';
import ReviewCardProfile from './ReviewCardProfile';

const MyReviews = ({ reviews, profilePic }: { reviews: Review[]; profilePic: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const currentData = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (currentData.length === 0) {
    setCurrentPage(1);
  }

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
      <div className='w-[802px] min-h-[75vh] h-fit mb-3'>
        <Card>
          <CardHeader>
            <CardTitle>Suas avaliações</CardTitle>
            <CardDescription>Aqui você encontra todos as suas avaliações de guia!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='w-[500px] flex items-center flex-col'>
              <div className='w-fit flex flex-col items-center justify-center'>
                <h1 className='text-xl font-bold bg-gradient-to-r from-tl-red to-tl-purple bg-clip-text text-transparent'>
                  Que vazio...
                </h1>
                <br />
                <p className='text-sm text-center w-1/2'>
                  Você ainda não avaliou nenhum guia de turismo... ainda!
                </p>
                <br />
                <p className='text-sm w-1/2 text-center'>
                  Que tal compartilhar suas experiências e ajudar outros viajantes a encontrar os
                  melhores profissionais?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              return <ReviewCardProfile review={review} profilePic={profilePic} key={review.id} />;
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
