import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { poppins } from '../lib/fonts';
import Navbar from '@/components/Navbar/Navbar';
import SessionProvider from '@/components/Auth/SessionProvider';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'TourLink',
  description: 'TourLink is the worlds top leading Tourist Guide finding platform.'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html className={poppins.className} lang='en'>
      <SessionProvider session={session}>
        <body>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
