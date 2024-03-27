import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { poppins } from '../lib/fonts';

export const metadata: Metadata = {
  title: 'TourLink',
  description: 'TourLink is the worlds top leading tour finding platform.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={poppins.className} lang='en'>
      <body>{children}</body>
    </html>
  );
}
