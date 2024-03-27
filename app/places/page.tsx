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

type User = {
  name: string;
  email: string;
};

const page = async () => {
  const promise = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: User[] = await promise.json();
  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <Table>
        <TableHeader>
          <TableHead>Ponto de Interesse</TableHead>
          <TableHead>Tipo</TableHead>
        </TableHeader>
        <TableBody>
          {data.map((user, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
