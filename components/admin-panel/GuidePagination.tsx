import { Button } from '../ui/button';

interface GuidePaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const GuidePagination = ({ currentPage, totalPages, onNext, onPrevious }: GuidePaginationProps) => {
  return (
    <div className='flex items-center justify-center w-full gap-4 mt-4'>
      <Button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'
      >
        Anterior
      </Button>
      <p>
        {currentPage} de {totalPages}
      </p>
      <Button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'
      >
        Próximo
      </Button>
    </div>
  );
};

export default GuidePagination;
