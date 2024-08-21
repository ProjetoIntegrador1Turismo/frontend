import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import InterestPointEdit from './InterestPointsEdit';

const InterestPoints = async () => {
  return (
    <Card className='w-[667px] min-h-[75vh]'>
      <CardHeader>
        <CardTitle>Edição de pontos de interesse</CardTitle>
        <CardDescription>Selecione o ponto de interesse que deseja editar.</CardDescription>
      </CardHeader>
      <CardContent>
        <InterestPointEdit />
      </CardContent>
    </Card>
  );
};

export default InterestPoints;
