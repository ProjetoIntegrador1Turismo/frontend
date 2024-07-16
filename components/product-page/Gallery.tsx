'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Image from 'next/image';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

const TourGallery = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <a
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className='flex gap-5 select-none'>
          <Image
            alt='sexo'
            src='https://i.imgur.com/wKCqVTl.png'
            className='rounded-3xl transition-opacity hover:opacity-80 shadow-lg shadow-gray-500'
            width={800}
            height={500}
          />
          <div className='grid grid-cols-2 gap-5'>
            <Image
              alt='sexo'
              src='https://i.imgur.com/wKCqVTl.png'
              className='rounded-3xl h-[240px] transition-opacity hover:opacity-80 shadow-lg shadow-gray-500'
              width={370}
              height={240}
            />
            <Image
              alt='sexo'
              src='https://i.imgur.com/wKCqVTl.png'
              className='rounded-3xl h-[240px] transition-opacity hover:opacity-80 shadow-lg shadow-gray-500'
              width={370}
              height={240}
            />
            <Image
              alt='sexo'
              src='https://i.imgur.com/wKCqVTl.png'
              className='rounded-3xl h-[240px] transition-opacity hover:opacity-80 shadow-lg shadow-gray-500'
              width={370}
              height={240}
            />
            <Image
              alt='sexo'
              src='https://i.imgur.com/wKCqVTl.png'
              className='rounded-3xl h-[240px] transition-opacity hover:opacity-80 shadow-lg shadow-gray-500'
              width={370}
              height={240}
            />
          </div>
        </div>
      </a>
      <Lightbox
        open={open}
        close={() => {
          setOpen(false);
        }}
        plugins={[Counter]}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        slides={[
          { src: 'https://i.imgur.com/wKCqVTl.png', width: 1400 },
          { src: 'https://i.imgur.com/wKCqVTl.png', width: 1400 },
          { src: 'https://i.imgur.com/wKCqVTl.png', width: 1400 }
        ]}
      />
    </>
  );
};

export default TourGallery;
