'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Guide } from '@/lib/interfaces';


interface GuideTableProps {
  guides: Guide[];
  actionButton: (id: number) => React.ReactNode;
}

const GuideTable = ({ guides, actionButton }: GuideTableProps) => {
  return (
    <>
      <Table className='border border-black rounded-xl'>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Cadastur</TableHead>
            <TableHead className='text-center'>Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guides.map((guide) => (
            <TableRow key={guide.id}>
              <TableCell>{guide.firstName}</TableCell>
              <TableCell>{guide.cadasturCode}</TableCell>
              <TableCell className='flex justify-evenly'>{actionButton(guide.id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total de guias: {guides.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default GuideTable;
