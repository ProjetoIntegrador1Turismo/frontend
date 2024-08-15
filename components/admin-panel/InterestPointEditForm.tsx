'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InterestPointEditFormSchema } from '@/schemas';
import { FormError } from '../Auth/form-error';
import { FormSucess } from '../Auth/form-sucess';
import { useRouter } from 'next/navigation';
import ControlledInput from './ControlledInput';
import InterestPointTypes from './InterestPointTypes';
import ControlledTextArea from './ControlledTextArea';
import ControlledDatePicker from './ControlledDatePicker';
import ControlledCheckBox from './ControlledCheckbox';
import { updateInterestPoint } from '@/actions/updateInterestPoint';
import ControlledFileInput from './ControlledFileInput';
import { parseISO } from 'date-fns';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ControlledSingleFileInput from './ControlledSingleFileInput';

export interface InterestPointData {
  id: number;
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
  date?: string;
  starsNumber?: number | null;
  isResort?: boolean | null;
  breakfastIncluded?: boolean | null;
  foodType?: string;
}

const InterestPointEditForm = ({ InterestPoint }: { InterestPoint: InterestPointData }) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const { data: SessionData } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof InterestPointEditFormSchema>>({
    resolver: zodResolver(InterestPointEditFormSchema),
    shouldUnregister: true,
    defaultValues: {
      name: InterestPoint.name,
      averageValue: `${InterestPoint.averageValue}`,
      date: InterestPoint.date ? parseISO(InterestPoint.date) : '',
      duration: InterestPoint.duration,
      foodType: InterestPoint.foodType,
      longDescription: InterestPoint.longDescription,
      number: InterestPoint.address?.number,
      requiredAge: InterestPoint.requiredAge,
      road: InterestPoint.address?.road,
      shortDescription: InterestPoint.shortDescription,
      starsNumber: String(InterestPoint.starsNumber),
      type: InterestPoint.interestPointType,
      zipcode: InterestPoint.address?.zipCode,
      isResort: InterestPoint.isResort,
      breakfastIncluded: InterestPoint.breakfastIncluded
    }
  });

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
              <ControlledDatePicker
                control={form.control}
                disabled={isPending}
                label='Data do evento'
              />
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

    return typeSpecificFields[InterestPoint.interestPointType] || null;
  };

  const onSubmitUpdateEditInterestPoint = (values: z.infer<typeof InterestPointEditFormSchema>) => {
    setError('');
    setSuccess('');
    const { images, imgCover, ...updateValues } = values;
    const imgFormData = new FormData();
    imgFormData.append('id', `${InterestPoint.id}`);

    if (images) {
      images.forEach((img) => {
        imgFormData.append('files', img);
      });
    }

    if (imgCover) {
      imgFormData.append('imgCover', imgCover);
    }

    console.log(values)

    startTransition(() => {
      updateInterestPoint(updateValues, InterestPoint.id).then(async (data) => {
        setSuccess(data.success);
        setError(data.error);
        let imageResponse;
        if (images || imgCover) {
          imageResponse = await axios.post(
            'http://localhost:8081/file/upload/interest-point/multiples',
            imgFormData,
            {
              headers: { Authorization: `Bearer ${SessionData?.user.authToken}` }
            }
          );
        }

        if (imageResponse && imageResponse.status !== 200) {
          setError('Erro com as imagens');
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (data.success) {
          router.push('/admin');
        }
      });
    });
  };

  return (
    <Card className='mb-4'>
      <CardHeader>
        <CardTitle>Editar um ponto de interesse</CardTitle>
        <CardDescription>Edite os dados de {InterestPoint.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitUpdateEditInterestPoint)}
            className='flex flex-col gap-4'
          >
            <div className='flex gap-4'>
              <div className='space-y-2'>
                <ControlledInput
                  control={form.control}
                  label='Nome'
                  name='name'
                  type='text'
                  disabled={isPending}
                />
                <ControlledInput
                  control={form.control}
                  disabled={isPending}
                  label='Preço'
                  name='averageValue'
                  type='number'
                  min={1}
                  max={3}
                />
                <InterestPointTypes control={form.control} disabled />
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
                  disabled={isPending}
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
            <div className='space-y-2'>
              <ControlledFileInput
                control={form.control}
                disabled={isPending}
                label='Imagens'
                name='images'
              />
              <ControlledSingleFileInput
                control={form.control}
                disabled={isPending}
                label='Imagem de Capa'
                name='imgCover'
              />
            </div>
            {renderOptionalFields()}
            <div className='flex gap-3'>
              <Button
                className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'
                type='submit'
                disabled={isPending}
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
  );
};

export default InterestPointEditForm;
