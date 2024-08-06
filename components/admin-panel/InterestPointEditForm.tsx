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
import { updateInterestPoint } from '@/actions/updateInterestPoint';

export interface InterestPointData {
  id: string;
  name: string;
  interestPointType: string;
  shortDescription?: string;
  imageCoverUrl?: string;
  duration?: string;
  averageValue?: string;
  address?: {
    zipCode: string;
    road: string;
    number: string;
  };
  longDescription?: string;
  requiredAge?: string;
  date?: Date;
  starsNumber?: number | null;
  isResort?: boolean | null;
  breakfastIncluded?: boolean | null;
  foodType?: string;
}

const InterestPointEditForm = ({ InterestPoint }: { InterestPoint: InterestPointData }) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();

  const form = useForm<z.infer<typeof InterestPointFormSchema>>({
    resolver: zodResolver(InterestPointFormSchema),
    shouldUnregister: true,
    defaultValues: {
      name: InterestPoint.name,
      averageValue: +!InterestPoint.averageValue,
      date: InterestPoint.date,
      duration: InterestPoint.duration,
      foodType: InterestPoint.foodType,
      longDescription: InterestPoint.longDescription,
      number: InterestPoint.address?.number,
      requiredAge: InterestPoint.requiredAge,
      road: InterestPoint.address?.road,
      shortDescription: InterestPoint.shortDescription,
      starsNumber: InterestPoint.starsNumber,
      type: InterestPoint.interestPointType,
      zipcode: InterestPoint.address?.zipCode,
      isResort: false,
      breakfastIncluded: false
    }
  });

  const renderOptionalFields = () => {
    switch (InterestPoint.interestPointType) {
      case 'TOURIST_POINT':
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
            </div>
          </div>
        );

      case 'HOTEL':
        return (
          <div className='flex gap-3'>
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

  const onSubmitUpdateInterestPoint = (values: z.infer<typeof InterestPointFormSchema>) => {
    setError('');
    setSuccess('');
    updateInterestPoint(values, InterestPoint.id).then(async (data) => {
      setSuccess(data.success);
      setError(data.error);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (data.success) {
        router.refresh();
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edicao do ponto de interesse</CardTitle>
        <CardDescription>Insira os dados e crie um ponto de interesse.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitUpdateInterestPoint)}
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
                <InterestPointTypes control={form.control} disabled />
              </div>
            </div>
            {renderOptionalFields()}
            <div className='flex gap-3'>
              <Button className='bg-gradient-to-r from-tl-red to-tl-purple w-fit' type='submit'>
                Cadastrar
              </Button>
              <FormError message={error} />
              <FormSucess message={success} />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'></CardFooter>
    </Card>
  );
};

export default InterestPointEditForm;
