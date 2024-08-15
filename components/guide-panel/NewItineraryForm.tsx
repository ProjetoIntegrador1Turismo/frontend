'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '../ui/button';
import { useState, useTransition } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewItineraryFormSchema } from '@/schemas';
import { FormError } from '../Auth/form-error';
import { FormSucess } from '../Auth/form-sucess';
import { useRouter } from 'next/navigation';
import { createInterestPoint } from '@/actions/createInterestPoint';
import ControlledInput from '../admin-panel/ControlledInput';
import ControlledTextArea from '../admin-panel/ControlledTextArea';
import ControlledSingleFileInput from '../admin-panel/ControlledSingleFileInput';
import InterestPointPaginated from './InterestPointPaginated';

const NewItineraryForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();

  const form = useForm<z.infer<typeof NewItineraryFormSchema>>({
    resolver: zodResolver(NewItineraryFormSchema),
    shouldUnregister: true,
    defaultValues: {
      interestPointIds: []
    }
  });

  const imgCoverRef = form.register('imgCover');

  const onSubmitCreateItinerary = (values: z.infer<typeof NewItineraryFormSchema>) => {
    console.log(values);
  };
  return (
    <div className='h-[75vh]'>
      <Card>
        <CardHeader>
          <pre>{JSON.stringify(form.watch(), null, 2)}</pre>
          <CardTitle>Criação de Roteiros</CardTitle>
          <CardDescription>Insira os dados e crie um novo roteiro.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitCreateItinerary)}
              className='flex flex-col gap-4'
            >
              <div className='flex gap-4'>
                <ControlledInput
                  control={form.control}
                  name='title'
                  label='Título do Roteiro'
                  type='text'
                  className='flex-grow'
                />
                <ControlledInput
                  control={form.control}
                  name='averageCost'
                  label='Custo médio'
                  type='text'
                  className='flex-grow'
                />
                <ControlledInput
                  control={form.control}
                  name='days'
                  label='Dias'
                  type='number'
                  min={1}
                  max={99}
                  className='w-16'
                />
              </div>

              <ControlledTextArea
                control={form.control}
                label='Descrição do roteiro'
                name='description'
                placeholder='Escreva a descrição do roteiro...'
                className='shadow-md shadow-gray-400 border border-black resize-none'
              />

              <ControlledSingleFileInput
                control={form.control}
                name='imgCover'
                label='Imagem de Capa'
                ref={imgCoverRef}
              />

              <Dialog>
                <div className='flex gap-3 items-center'>
                  <h1>Pontos de Interesse</h1>
                  <DialogTrigger asChild className='bg-gradient-to-r from-tl-red to-tl-purple'>
                    <Button size='sm'>Inserir</Button>
                  </DialogTrigger>
                </div>
                <div>
                  {form.getValues().interestPointIds.map((number) => {
                    return (
                      <div className='flex justify-between w-[300px]'>
                        <p>Interest point id {number}</p>
                        <Button
                          onClick={() => {
                            form.setValue(
                              'interestPointIds',
                              form.getValues().interestPointIds.filter((id) => id !== number)
                            );
                          }}
                          variant='destructive'
                        >
                          remover
                        </Button>
                      </div>
                    );
                  })}
                  <p className='text-red-500 text-sm'>
                    {form.getFieldState('interestPointIds').error?.message}
                  </p>
                </div>
                <DialogContent className='sm:max-w-[1200px]'>
                  <DialogHeader>
                    <DialogTitle>
                      <span className='select-none'>Pontos de Interesse</span>
                    </DialogTitle>
                  </DialogHeader>
                  {/* <DialogClose asChild>
                      <Button
                        onClick={() => {
                          form.setValue('interestPointIds', [
                            ...form.getValues().interestPointIds,
                            1
                          ]);
                        }}
                      >
                        id 1
                      </Button>
                    </DialogClose> */}
                  <Tabs defaultValue='account'>
                    <TabsList className='gap-2 w-fit'>
                      <TabsTrigger value='touristpoint' className='shadow-md shadow-gray-400'>
                        Pontos Turísticos
                      </TabsTrigger>
                      <TabsTrigger value='experience' className='shadow-md shadow-gray-400'>
                        Experiências
                      </TabsTrigger>
                      <TabsTrigger value='hotel' className='shadow-md shadow-gray-400'>
                        Hóteis
                      </TabsTrigger>
                      <TabsTrigger value='restaurant' className='shadow-md shadow-gray-400'>
                        Restaurantes
                      </TabsTrigger>
                      <TabsTrigger value='event' className='shadow-md shadow-gray-400'>
                        Eventos
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value='touristpoint'>
                      <InterestPointPaginated
                        type='touristpoint'
                        addInterestPoint={(id: number) => {
                          form.setValue('interestPointIds', [
                            ...form.getValues().interestPointIds,
                            id
                          ]);
                        }}
                      />
                    </TabsContent>
                    <TabsContent value='experience'>
                      <InterestPointPaginated
                        type='experience'
                        addInterestPoint={(id: number) => {
                          form.setValue('interestPointIds', [
                            ...form.getValues().interestPointIds,
                            id
                          ]);
                        }}
                      />
                    </TabsContent>
                    <TabsContent value='hotel'>
                      <InterestPointPaginated
                        type='hotel'
                        addInterestPoint={(id: number) => {
                          form.setValue('interestPointIds', [
                            ...form.getValues().interestPointIds,
                            id
                          ]);
                        }}
                      />
                    </TabsContent>
                    <TabsContent value='restaurant'>
                      <InterestPointPaginated
                        type='restaurant'
                        addInterestPoint={(id: number) => {
                          form.setValue('interestPointIds', [
                            ...form.getValues().interestPointIds,
                            id
                          ]);
                        }}
                      />
                    </TabsContent>
                    <TabsContent value='event'>
                      <InterestPointPaginated
                        type='event'
                        addInterestPoint={(id: number) => {
                          form.setValue('interestPointIds', [
                            ...form.getValues().interestPointIds,
                            id
                          ]);
                        }}
                      />
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type='submit' variant='destructive'>
                        Fechar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

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

export default NewItineraryForm;
