'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

interface BackButtonProps {
  href: string;
  label: string;
}

import React from 'react';

const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button variant='link' className={'font-normal w-full'} size='sm' asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
