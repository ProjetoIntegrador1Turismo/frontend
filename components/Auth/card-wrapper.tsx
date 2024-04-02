'use client';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import React from 'react';
import Header from './header';
import BackButton from './back-button';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  headerTitle: string;
}

const CardWrapper = ({
  backButtonHref,
  children,
  headerLabel,
  backButtonLabel,
  headerTitle
}: CardWrapperProps) => {
  return (
    <Card className='w-[400px] shadow-lg shadow-gray-500'>
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
