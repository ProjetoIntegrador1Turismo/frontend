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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Guide } from '@/lib/interfaces';
import { Button } from '../ui/button';
import { Check, CircleXIcon } from 'lucide-react';
import { useToast } from '../ui/use-toast';

interface QueryReturn {
  data: Guide[];
}

const GuideApproval = () => {
  const { data: sessionData } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, error, isLoading } = useQuery<QueryReturn, Error>({
    queryKey: ['pendingGuides'],
    queryFn: async () => {
      return axios.get('http://localhost:8081/admin/unapproved-guides', {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
    },
    refetchOnWindowFocus: false
  });

  const {
    mutate: approveGuide,
    isPending: isPendingApproval  
  } = useMutation({
    mutationFn: async (id: number) => {
      return axios.put(`http://localhost:8081/admin/approve-guide/${id}`, {}, {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries({ queryKey: ['pendingGuides'] });
      toast({
        title: 'Guia foi aprovado!',
        description: `Guia de id ${response.data.id} foi aprovado com sucesso!`
      });
    },
  });

  const {
    mutate: denyGuide,
    isPending: isPendingDenial
  } = useMutation({
    mutationFn: async (id: number) => {
      return axios.put(`http://localhost:8081/admin/disapprove-guide/${id}`, {}, {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['pendingGuides'] });
      toast({
        title: 'Guia foi negado!',
        description: `Guia de id ${response.data.id} foi negado com sucesso!`,
        variant: 'destructive'
      });
    }
  });

  if (isLoading) return <p className='break-words max-w-[500px]'>loading...</p>;
  if (error)
    return (
      <p className='break-words max-w-[500px]'>
        error <pre>{JSON.stringify(error, null, 2)} </pre>
      </p>
    );

  return (
    <Card className='w-[667px]'>
      <CardHeader>
        <CardTitle>Aprovar cadastro de guias de turismo</CardTitle>
        <CardDescription>Aprove os guias para liberar o acesso.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className='border border-black rounded-xl'>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cadastur</TableHead>
              <TableHead className='text-center'>
                Ação
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((guide) => {
              return (
                <TableRow>
                  <TableCell>{guide.firstName}</TableCell>
                  <TableCell>{guide.cadasturCode}</TableCell>
                  <TableCell className='flex justify-evenly'>
                    <Button
                      className='bg-green-500'
                      disabled={isPendingApproval}
                      onClick={() => approveGuide(guide.id)}
                    >
                      <Check />
                    </Button>
                    <Button
                      variant='destructive'
                      disabled={isPendingDenial}
                      onClick={() => denyGuide(guide.id)}
                    >
                      <CircleXIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total de guias: {data.data.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default GuideApproval;
