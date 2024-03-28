'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

type InterestPoint = {
  name: string;
  interestPointType: string;
  id: number;
};

interface FooterProps {
  AppName: string;
}

const page = async () => {
  const promise = await fetch('http://localhost:8081/interestpoint');
  const data: InterestPoint[] = await promise.json();
  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <Table>
        <TableHeader>
          <TableHead>Ponto de Interesse</TableHead>
          <TableHead>Tipo</TableHead>
        </TableHeader>
        <TableBody>
          {data.map(({ name, interestPointType, id }) => {
            return (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{interestPointType}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
