'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Comment } from './Profile';
import CommentCard from './CommentCard';
import { Button } from '../ui/button';

const MyComments = ({ comments, profilePic }: { comments: Comment[]; profilePic: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(comments.length / itemsPerPage);

  const currentData = comments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
          <CardTitle>Seus comentários</CardTitle>
          <CardDescription>
            Aqui você encontra todos os seus comentários de pontos de interesse!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 grid-rows-3 gap-4'>
            {currentData.map((comment) => {
              return <CommentCard comment={comment} profilePic={profilePic} key={comment.id} />;
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

export default MyComments;
