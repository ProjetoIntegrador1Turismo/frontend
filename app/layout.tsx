import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { poppins } from '../lib/fonts';
import Navbar from '@/components/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'TourLink',
  description: 'TourLink is the worlds top leading Tourist Guide finding platform.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={poppins.className} lang='en'>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
