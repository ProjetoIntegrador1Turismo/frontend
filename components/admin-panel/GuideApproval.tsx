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

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { useQuery } from '@tanstack/react-query';

const GuideApproval = () => {
  const { data, error, isLoading } = useQuery<
    { name: string; cadastur: string; email: string },
    Error
  >({
    queryKey: ['pendingGuides'],
    queryFn: async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      return { name: 'burns', cadastur: '12345', email: 'burns@gmail.com' };
    }
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aprovar cadastro de guias de turismo</CardTitle>
        <CardDescription>Aprove os guias para liberar o acesso.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className='border border-black rounded'>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cadastur</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{data?.name}</TableCell>
              <TableCell>{data?.email}</TableCell>
              <TableCell>{data?.cadastur}</TableCell>
              <TableCell>
                <a>aprovar</a>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell>$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default GuideApproval;
