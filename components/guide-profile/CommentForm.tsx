'use client';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Form, FormLabel } from '../ui/form';
import * as z from 'zod';
import { CommentSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import ControlledTextArea from '../admin-panel/ControlledTextArea';
import { Button } from '../ui/button';

const CommentForm = () => {
  const [ratingValue, setRatingValue] = useState<number | null>();

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema)
  });

  const onSubmitCreateComment = (values: z.infer<typeof CommentSchema>) => {
    console.log(values);
  };

  return (
    <div className='min-h-[75vh] max-w-[500px] h-fit'>
      <Card>
        <CardHeader>
          <CardTitle>Avaliação de Guia</CardTitle>
          <CardDescription>Escreva um texto avaliando esse guia!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitCreateComment)}
              className='flex flex-col gap-4'
            >
              <FormLabel
                className={`${form.getFieldState('rating').error?.message ? 'text-red-500' : ''}`}
              >
                Avaliação
              </FormLabel>
              <Rating
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                  form.setValue('rating', newValue ?? 0);
                }}
              />
              {form.getFieldState('rating').error?.message ? (
                <p className='text-red-500 text-sm'>
                  {form.getFieldState('rating').error?.message}
                </p>
              ) : null}
              <ControlledTextArea
                control={form.control}
                label='Comentário'
                name='commentText'
                placeholder='Insira um comentário'
                className='resize-none shadow-md shadow-gray-400 border border-black'
              />
              <Button
                // disabled={isPending}
                className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'
                type='submit'
              >
                Cadastrar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentForm;
