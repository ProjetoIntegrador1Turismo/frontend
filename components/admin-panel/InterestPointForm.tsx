'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InterestPointFormSchema } from '@/schemas';
import { FormError } from '../Auth/form-error';
import { FormSucess } from '../Auth/form-sucess';
import { useRouter } from 'next/navigation';
import ControlledInput from './ControlledInput';
import InterestPointTypes from './InterestPointTypes';
import ControlledTextArea from './ControlledTextArea';
import ControlledDatePicker from './ControlledDatePicker';
import ControlledCheckBox from './ControlledCheckbox';
import { createInterestPoint } from '@/actions/createInterestPoint';

const InterestPointForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();

  const form = useForm<z.infer<typeof InterestPointFormSchema>>({
    resolver: zodResolver(InterestPointFormSchema),
    shouldUnregister: true,
    defaultValues: {
      isResort: false,
      breakfastIncluded: false
    }
  });

  const InterestPointType = form.watch('type');

  const renderOptionalFields = () => {
    switch (InterestPointType) {
      case 'TOURISTPOINT':
        return (
          <ControlledTextArea
            control={form.control}
            label='Descrição Longa'
            placeholder='Escreva uma descrição longa!'
            name='longDescription'
            className='resize-none shadow-md shadow-gray-400 border border-black'
          />
        );
      case 'EVENT':
        return (
          <div className='space-y-2'>
            <ControlledTextArea
              control={form.control}
              name='longDescription'
              label='Descrição Longa'
              placeholder='Escreva uma descrição longa!'
              className='resize-none shadow-md shadow-gray-400 border border-black'
            />
            <ControlledDatePicker control={form.control} label='Data do evento' />
          </div>
        );
      case 'RESTAURANT':
        return (
          <ControlledInput
            control={form.control}
            label='Tipo de comida'
            name='foodType'
            type='text'
          />
        );
      case 'EXPERIENCE':
        return (
          <div className='space-y-2'>
            <ControlledInput control={form.control} label='Categoria' name='category' type='text' />
            <ControlledTextArea
              control={form.control}
              label='Descrição Longa'
              placeholder='Escreva uma descrição longa!'
              name='longDescription'
              className='resize-none shadow-md shadow-gray-400 border border-black'
            />
            <div className='flex w-full gap-4'>
              <div className='flex-1'>
                <ControlledInput
                  control={form.control}
                  label='Idade requirida'
                  name='requiredAge'
                  type='text'
                  className='w-full'
                />
              </div>
              <div className='flex-1'>
                <ControlledInput
                  control={form.control}
                  label='Idade requirida'
                  name='requiredAge'
                  type='text'
                  className='w-full'
                />
              </div>
            </div>
          </div>
        );

      case 'HOTEL':
        return (
          <div className='flex'>
            <div className='flex-1'>
              <ControlledInput
                control={form.control}
                label='Número de estrelas'
                name='starsNumber'
                type='number'
                min={1}
                max={5}
              />
            </div>
            <div className='self-end'>
              <ControlledCheckBox control={form.control} label='É resort?' name='isResort' />
            </div>
            <div className='self-end'>
              <ControlledCheckBox
                control={form.control}
                label='Café da manhã incluso?'
                name='breakfastIncluded'
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const onSubmitCreateInterestPoint = (values: z.infer<typeof InterestPointFormSchema>) => {
    setError('');
    setSuccess('');
    createInterestPoint(values).then(async (data) => {
      setSuccess(data.success);
      setError(data.error);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (data.success) {
        router.push('/admin');
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criação de Pontos de interesse</CardTitle>
        <CardDescription>Insira os dados e crie um ponto de interesse.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitCreateInterestPoint)}
            className='flex flex-col gap-4'
          >
            <div className='flex gap-4'>
              <div className='space-y-2'>
                <ControlledInput control={form.control} label='Nome' name='name' type='text' />
                <ControlledInput
                  control={form.control}
                  label='Preço'
                  name='averageValue'
                  type='number'
                  min={1}
                  max={3}
                />
                <ControlledInput
                  control={form.control}
                  label='Duração'
                  name='duration'
                  type='text'
                />
              </div>
              <div className='space-y-2'>
                <ControlledInput control={form.control} label='Rua' name='road' type='text' />
                <ControlledInput
                  control={form.control}
                  label='Número'
                  name='number'
                  type='number'
                />
                <ControlledInput control={form.control} label='CEP' name='zipcode' type='text' />
              </div>
              <div className='space-y-2'>
                <ControlledTextArea
                  control={form.control}
                  label='Descrição Curta'
                  placeholder='Escreva uma descrição curta!'
                  name='shortDescription'
                  className='resize-none shadow-md shadow-gray-400 border border-black h-[120px]'
                />
                <InterestPointTypes control={form.control} />
              </div>
            </div>
            {renderOptionalFields()}
            <Button className='bg-gradient-to-r from-tl-red to-tl-purple w-fit' type='submit'>
              Cadastrar
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <pre>
          {JSON.stringify(form.watch(), null, 2)}
        </pre>
        <FormError message={error} />
        <FormSucess message={success} />
      </CardFooter>
    </Card>
  );
};

export default InterestPointForm;
