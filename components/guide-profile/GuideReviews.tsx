import React from 'react';
import { Review } from './GuideProfileTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import CommentCard from './CommentCard';
import { CommentFormDialog } from './CommentFormDialog';

const GuideReviews = ({
  reviews,
  guideId,
  guideName
}: {
  reviews: Review[];
  guideId: number;
  guideName: string;
}) => {
  if (reviews.length === 0) {
    return <p>Wow, que vazio!</p>;
  }

  return (
    <div className='min-h-[75vh] h-fit w-fit'>
      <Card>
        <CardHeader>
          <CardTitle>Reviews do guia</CardTitle>
          <CardDescription>
            Aqui você encontra todos as avaliações que {guideName} recebeu!
          </CardDescription>
          <CommentFormDialog guideId={guideId} guideName={guideName} />
        </CardHeader>
        <CardContent className='grid grid-cols-3 grid-rows-2 gap-4'>
          {reviews.map((review) => {
            return <CommentCard review={review} key={review.id} />;
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuideReviews;
