/* eslint-disable prettier/prettier */
'use client';
import React, { useState, useTransition } from 'react';
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { RegisterGuideSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from './form-error';
import { FormSucess } from './form-sucess';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { registerGuide } from '@/actions/registerGuide';

const RegisterGuideForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterGuideSchema>>({
    resolver: zodResolver(RegisterGuideSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      cadastur: ''
    }
  });

  const onSubmit = (values: z.infer<typeof RegisterGuideSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      registerGuide(values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  return (
    <CardWrapper
      headerTitle='Criar uma conta'
      headerLabel='Bem vindo guia de turista!'
      backButtons={[
        {
          href: '/login',
          label: 'Já tem uma conta?'
        },
        {
          href: '/register',
          label: 'Não é um guia de turismo? Cadastre-se aqui!'
        }
      ]}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
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
            <FormField
              control={form.control}
              name='cadastur'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cadastur</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} placeholder='Seu cadastur' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-xs flex items-center space-x-2 text-yellow-800'>
              <InfoCircledIcon />
              <p>Cadastros de guias são aprovados manualmente!</p>
            </div>
          </div>
          <FormError message={error} />
          <FormSucess message={success} />
          <Button
            disabled={isPending}
            type='submit'
            className='w-full bg-gradient-to-r from-tl-red to-tl-purple'
          >
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterGuideForm;
