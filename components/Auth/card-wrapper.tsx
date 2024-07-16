'use client';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { CardWrapperProps } from '@/lib/interfaces';
import React from 'react';
import Header from './header';
import BackButton from './back-button';

const CardWrapper = ({ children, headerLabel, headerTitle, backButtons }: CardWrapperProps) => {
  return (
    <Card className='w-[400px] shadow-lg shadow-gray-500 h-fit m-auto'>
      <CardHeader>
        <Header label={headerLabel} title={headerTitle} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className='m-auto'>
          {backButtons.map(({ href, label }, i) => {
            return <BackButton href={href} label={label} key={i} />;
          })}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
