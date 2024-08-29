'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Image from 'next/image';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

const ItineraryGallery = ({ imgCover }: { imgCover: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <a
        onClick={() => {
          setOpen(true);
        }}
      >
        <div>
          <Image
            alt='Cover'
            src={imgCover}
            className='rounded-3xl transition-opacity hover:opacity-80 shadow-lg shadow-gray-500 w-full h-[600px] object-cover'
            width={1200}
            height={800}
          />
        </div>
      </a>
      <Lightbox
        open={open}
        close={() => {
          setOpen(false);
        }}
        slides={[{ src: imgCover, width: 1400}]}
      />
    </>
  );
};

export default ItineraryGallery;
