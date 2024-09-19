'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from './form-error';
import { RecoverySchema } from '@/schemas';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CardWrapper from './card-wrapper';
import * as z from 'zod';
import { recoverPassword } from '@/actions/recoverPassword';
import { FormSucess } from './form-sucess';

const RecoveryForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof RecoverySchema>>({
    resolver: zodResolver(RecoverySchema)
  });

  const onSubmit = (values: z.infer<typeof RecoverySchema>) => {
    setError('');
    startTransition(() => {
      recoverPassword(values).then(async (data) => {
        setError(data?.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerTitle='Recuperar senha'
      headerLabel='Insira seu e-mail e você receberá um link na sua caixa de entrada para criar uma nova senha.'
      backButtons={[
        {
          href: '/login',
          label: 'Fazer login'
        },
        {
          href: '/register',
          label: 'Não tem uma conta?'
        }
      ]}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder='Seu email' type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSucess message={success} />
          <Button
            disabled={isPending}
            type='submit'
            className='w-full bg-gradient-to-r from-tl-red to-tl-purple'
          >
            Criar nova senha
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RecoveryForm;
