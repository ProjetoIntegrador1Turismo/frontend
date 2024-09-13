'use client';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Form, FormLabel } from '../ui/form';
import * as z from 'zod';
import { CommentSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Rating from '@mui/material/Rating';
import { useState, useTransition } from 'react';
import ControlledTextArea from '../admin-panel/ControlledTextArea';
import { Button } from '../ui/button';
import { FormError } from '../Auth/form-error';
import { FormSucess } from '../Auth/form-sucess';
import { createGuideReview } from '@/actions/createGuideReview';

const CommentForm = ({ guideId, guideName }: { guideId: number; guideName: string }) => {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema)
  });

  const onSubmitCreateComment = (values: z.infer<typeof CommentSchema>) => {
    startTransition(() => {
      createGuideReview(values, guideId).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  return (
    <div className='max-w-[500px] h-fit'>
      <Card>
        <CardHeader>
          <CardTitle>Avaliação de Guia</CardTitle>
          <CardDescription>Escreva um texto avaliando {guideName}!</CardDescription>
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
                disabled={isPending}
                onChange={(event, newValue) => {
                  setRatingValue(newValue ?? 0);
                  form.setValue('rating', newValue ?? 0);
                  form.clearErrors('rating');
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
                disabled={isPending}
                name='commentText'
                placeholder='Insira um comentário'
                className='resize-none shadow-md shadow-gray-400 border border-black'
              />
              <FormError message={error} />
              <FormSucess message={success} />
              <Button
                disabled={isPending}
                className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'
                type='submit'
              >
                Avaliar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentForm;
