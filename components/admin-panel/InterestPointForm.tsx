'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InterestPointFormSchema } from '@/schemas';
import { FormError } from '../Auth/form-error';
import { FormSucess } from '../Auth/form-sucess';
import { useRouter } from 'next/navigation';
import { JSX } from 'react';
import ControlledInput from './ControlledInput';
import InterestPointTypes from './InterestPointTypes';
import ControlledTextArea from './ControlledTextArea';
import ControlledDatePicker from './ControlledDatePicker';
import ControlledCheckBox from './ControlledCheckbox';
import { createInterestPoint } from '@/actions/createInterestPoint';

const InterestPointForm = () => {
  const [isPending, startTransition] = useTransition();
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
    const typeSpecificFields: Record<string, JSX.Element | null> = {
      TOURIST_POINT: (
        <div className='space-y-2'>
          <ControlledTextArea
            control={form.control}
            disabled={isPending}
            label='Descrição Longa'
            placeholder='Escreva uma descrição longa!'
            name='longDescription'
            className='resize-none shadow-md shadow-gray-400 border border-black'
          />
          <ControlledInput
            control={form.control}
            disabled={isPending}
            label='Duração'
            name='duration'
            type='text'
            className='resize-none shadow-md shadow-gray-400 border border-black'
          />
        </div>
      ),
      EVENT: (
        <div className='space-y-2'>
          <ControlledTextArea
            control={form.control}
            disabled={isPending}
            label='Descrição Longa'
            placeholder='Escreva uma descrição longa!'
            name='longDescription'
            className='resize-none shadow-md shadow-gray-400 border border-black'
          />
          <div className='flex gap-3'>
            <div>
              <ControlledDatePicker control={form.control} label='Data do evento' />
            </div>
            <div className='flex-1'>
              <ControlledInput
                control={form.control}
                disabled={isPending}
                label='Duração'
                name='duration'
                type='text'
                className='resize-none shadow-md shadow-gray-400 border border-black'
              />
            </div>
          </div>
        </div>
      ),
      RESTAURANT: (
        <ControlledInput
          control={form.control}
          disabled={isPending}
          label='Tipo de comida'
          name='foodType'
          type='text'
        />
      ),
      EXPERIENCE: (
        <div className='space-y-2'>
          <div className='flex gap-3'>
            <div className='flex-1'>
              <ControlledInput
                control={form.control}
                disabled={isPending}
                label='Duração'
                name='duration'
                type='text'
                className='resize-none shadow-md shadow-gray-400 border border-black'
              />
            </div>
            <div className='flex-1'>
              <ControlledInput
                control={form.control}
                disabled={isPending}
                label='Idade requirida'
                name='requiredAge'
                type='text'
                className='flex-1'
              />
            </div>
          </div>
          <ControlledTextArea
            control={form.control}
            disabled={isPending}
            label='Descrição Longa'
            placeholder='Escreva uma descrição longa!'
            name='longDescription'
            className='resize-none shadow-md shadow-gray-400 border border-black'
          />
        </div>
      ),
      HOTEL: (
        <div className='flex gap-3 items-center'>
          <ControlledInput
            control={form.control}
            disabled={isPending}
            label='Número de estrelas'
            name='starsNumber'
            type='number'
            min={1}
            max={5}
            className='flex-1'
          />
          <ControlledCheckBox
            control={form.control}
            disabled={isPending}
            label='É resort?'
            name='isResort'
          />
          <ControlledCheckBox
            control={form.control}
            disabled={isPending}
            label='Café da manhã incluso?'
            name='breakfastIncluded'
          />
        </div>
      ),
      default: null
    };

    return typeSpecificFields[InterestPointType] || null;
  };

  const onSubmitCreateInterestPoint = (values: z.infer<typeof InterestPointFormSchema>) => {
    setError('');
    setSuccess('');
    startTransition(() => {
      createInterestPoint(values).then(async (data) => {
        setSuccess(data.success);
        setError(data.error);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (data.success) {
          router.refresh();
        }
      });
    });
  };

  return (
    <div className='min-h-[75vh] h-fit'>
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
                  <ControlledInput
                    control={form.control}
                    disabled={isPending}
                    label='Nome'
                    name='name'
                    type='text'
                  />
                  <ControlledInput
                    control={form.control}
                    label='Preço'
                    name='averageValue'
                    type='number'
                    min={1}
                    max={3}
                  />
                  <InterestPointTypes control={form.control} />
                </div>
                <div className='space-y-2'>
                  <ControlledInput
                    control={form.control}
                    disabled={isPending}
                    label='Rua'
                    name='road'
                    type='text'
                  />
                  <ControlledInput
                    control={form.control}
                    label='Número'
                    name='number'
                    type='number'
                  />
                  <ControlledInput
                    control={form.control}
                    disabled={isPending}
                    label='CEP'
                    name='zipcode'
                    type='text'
                  />
                </div>
                <div className='space-y-2'>
                  <ControlledTextArea
                    control={form.control}
                    disabled={isPending}
                    label='Descrição Curta'
                    placeholder='Escreva uma descrição curta!'
                    name='shortDescription'
                    className='resize-none shadow-md shadow-gray-400 border border-black h-[200px]'
                  />
                </div>
              </div>
              {renderOptionalFields()}
              <div className='flex gap-3'>
                <Button
                  disabled={isPending}
                  className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'
                  type='submit'
                >
                  Cadastrar
                </Button>
                <FormError message={error} />
                <FormSucess message={success} />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterestPointForm;
