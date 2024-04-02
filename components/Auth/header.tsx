import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import React from 'react';

interface HeaderProps {
  label: string;
  title: string;
}

const Header = ({ label, title }: HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
      <h1 className={cn('text-3xl font-semibold', poppins.className)}>{title}</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
};

export default Header;
