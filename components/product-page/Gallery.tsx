'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Image from 'next/image';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

const TourGallery = ({ imgCover, images }: { imgCover: string; images: string[] }) => {
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
            alt='Cover'
            src={imgCover}
            className='rounded-3xl transition-opacity hover:opacity-80 shadow-lg shadow-gray-500 w-[800px] h-[500px] object-cover'
            width={800}
            height={500}
          />
          <div className='grid grid-cols-2 gap-5'>
            {images.slice(0, 4).map((image, index) => {
              return (
                <Image
                  alt='Other'
                  src={image}
                  className='rounded-3xl h-[240px] w-[370px] transition-opacity hover:opacity-80 shadow-lg shadow-gray-500 object-cover'
                  width={370}
                  height={240}
                  key={index}
                />
              );
            })}
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
          { src: imgCover, width: 1400 },
          ...images.map((image) => {
            return { src: image, width: 1400 };
          })
        ]}
      />
    </>
  );
};

export default TourGallery;
