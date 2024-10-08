import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { poppins } from '../lib/fonts';
import Navbar from '@/components/Navbar/Navbar';
import SessionProvider from '@/components/Auth/SessionProvider';
import { auth } from '@/auth';
import Footer from '@/components/home-page/Footer';
import ReactQueryClientProvider from '@/components/providers/ReactQueryClientProvider';
import { Toaster } from '@/components/ui/toaster';

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
      <ReactQueryClientProvider>
        <SessionProvider session={session}>
          <body suppressHydrationWarning>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </body>
        </SessionProvider>
      </ReactQueryClientProvider>
    </html>
  );
}
