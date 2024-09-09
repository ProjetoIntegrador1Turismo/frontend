/* eslint-disable prettier/prettier */
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
import { register } from '@/actions/register';
import { FormSucess } from './form-sucess';
import { RegisterSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { FormError } from './form-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CardWrapper from './card-wrapper';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const backButtons = [
    {
      href: '/login',
      label: 'Já tem uma conta?'
    },
    {
      href: '/register/guide',
      label: 'É um guia de turismo? Cadastre-se aqui!'
    }
  ];

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values).then(async (data) => {
        setSuccess(data.success);
        setError(data.error);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (data.success) {
          router.push('/login');
        }
      });
    });
  };

  return (
    <CardWrapper headerTitle='Criar uma conta' headerLabel='Bem vindo' backButtons={backButtons}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo:</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder='Seu nome' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder='******' type='password' />
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
            Registrar
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
