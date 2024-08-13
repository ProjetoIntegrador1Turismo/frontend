import Link from 'next/link';
import { Button } from '../ui/button';

export default function PaginationControls({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  query
}: {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  query?: string;
}) {
  return (
    <div className='flex gap-4 justify-center items-center'>
      <Button
        disabled={!hasPreviousPage}
        className='bg-gradient-to-r from-tl-red to-tl-purple w-fit select-none'
      >
        <Link
          href={{
            pathname: '',
            query: {
              page: currentPage - 1,
              ...(query !== ' ' ? { query } : {})
            }
          }}
          passHref
        >
          Anterior
        </Link>
      </Button>
      <div className='flex gap-4'>
        {Array.from({ length: totalPages }).map((_, index) => {
          return (
            <Link
              key={index}
              href={{
                pathname: '',
                query: {
                  page: index + 1,
                  ...(query !== ' ' ? { query } : {})
                }
              }}
              className={`px-3 py-1 mx-1 rounded-full shadow-lg shadow-gray-500 ${
                currentPage === index + 1 ? 'bg-gray-300' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </Link>
          );
        })}
      </div>
      <Button disabled={!hasNextPage} className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'>
        <Link
          href={{
            pathname: '',
            query: {
              page: currentPage + 1,
              ...(query !== ' ' ? { query } : {})
            }
          }}
          passHref
        >
          Próximo
        </Link>
      </Button>
    </div>
  );
}
