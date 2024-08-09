import { auth } from '@/auth';
import Link from 'next/link';
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';

const InterestPoints = async () => {
  const session = await auth();
  const response = await fetch('http://localhost:8081/interestpoint', {
    headers: { Authorization: `Bearer ${session?.user.authToken}` },
    cache: 'no-cache'
  });

  const interestPointData = (await response.json()) as any[];
  return (
    <Card className='w-[667px]'>
      <CardHeader>
        <CardTitle>Edicao de pontos de interesse</CardTitle>
        <CardDescription>Selecione o ponto de interesse que deseja editar.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {interestPointData.map((interestPoint, index) => {
            return (
              <li key={index} className='cursor-pointer hover:underline'>
                <Link href={`/admin/interestpoint/edit/${interestPoint.id}`}>
                  {interestPoint.name}
                </Link>
              </li>
            );
          })}
      </ul>
      </CardContent>
    </Card>
  );
};

export default InterestPoints;
