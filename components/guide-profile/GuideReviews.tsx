import React from 'react';
import { Review } from './GuideProfileTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import ReviewCard from './ReviewCard';
import { CommentFormDialog } from './CommentFormDialog';

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
              <CommentFormDialog guideId={guideId} guideName={guideName} />
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
          {userType && userType !== 'Guide' && (
              <CommentFormDialog guideId={guideId} guideName={guideName} />
            )}
        </CardHeader>
        <CardContent className='grid grid-cols-3 grid-rows-2 gap-4'>
          {reviews.map((review) => {
            return <ReviewCard review={review} key={review.id} />;
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuideReviews;
