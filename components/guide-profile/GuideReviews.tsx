import React from 'react';
import { Review } from './GuideProfileTabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import CommentCard from './CommentCard';

const GuideReviews = ({ reviews }: { reviews: Review[] }) => {
  if (reviews.length === 0) {
    return <p>Wow, que vazio!</p>;
  }

  return (
    <div className='min-h-[75vh] h-fit'>
      <Card>
        <CardHeader>
          <CardTitle>Reviews do guia</CardTitle>
          <CardDescription>
            Aqui você encontra todos as avaliações que esse guia recebeu!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.map((review) => {
            return <CommentCard review={review} />;
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default GuideReviews;
