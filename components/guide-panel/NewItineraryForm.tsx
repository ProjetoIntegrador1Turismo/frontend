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
import ControlledInput from '../admin-panel/ControlledInput';
import ControlledTextArea from '../admin-panel/ControlledTextArea';
import ControlledSingleFileInput from '../admin-panel/ControlledSingleFileInput';
import InterestPointPaginated from './InterestPointPaginated';
import SelectedInterestPointCard from './SelectedInterestPointCard';
import { useToast } from '../ui/use-toast';
import { createItinerary } from '@/actions/createItinerary';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const NewItineraryForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof NewItineraryFormSchema>>({
    resolver: zodResolver(NewItineraryFormSchema),
    shouldUnregister: true,
    defaultValues: {
      interestPointIds: []
    }
  });

  const addInterestPoint = (id: number) => {
    form.getValues().interestPointIds.includes(id)
      ? toast({
          title: 'Não foi possivel adicionar esse ponto de interesse',
          description: 'Esse ponto de interesse já está no seu roteiro!',
          variant: 'destructive'
        })
      : form.setValue('interestPointIds', [...form.getValues().interestPointIds, id]);
  };

  const onSubmitCreateItinerary = (values: z.infer<typeof NewItineraryFormSchema>) => {
    const { imgCover, ...ItineraryValues } = values;
    setSuccess('');
    setError('');
    const imgFormData = new FormData();
    if (imgCover) {
      imgFormData.append('file', imgCover);
    }

    startTransition(() => {
      createItinerary(ItineraryValues).then(async (data) => {
        let imageResponse;

        if (data.success && imgCover) {
          imgFormData.append('id', data.id);
          imageResponse = await axios.post(
            'http://localhost:8081/file/upload/itinerary',
            imgFormData,
            {
              headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
            }
          );
        }

        setSuccess(data.success);
        setError(data.error);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (imageResponse && imageResponse.status !== 200) {
          setError('Erro com a imagem');
        }

        if (data.success) {
          router.push('/guide');
        }
      });
    });
  };
  // por alguma razao se tira essa linha nao funciona?
  form.watch();
  // que codigo lixo...
  // bom, funciona!
  // nao consigo entender pq funciona
  // n vou mais perder tempo nesse lixo

  return (
    <div className='min-h-[80vh] h-fit mb-3'>
      <Card>
        <CardHeader>
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
                  disabled={isPending}
                  name='title'
                  label='Título do Roteiro'
                  type='text'
                  className='flex-grow'
                />
                <ControlledInput
                  control={form.control}
                  disabled={isPending}
                  name='averageCost'
                  label='Custo médio'
                  type='number'
                  className='flex-grow'
                />
                <ControlledInput
                  control={form.control}
                  disabled={isPending}
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
                disabled={isPending}
                label='Descrição do roteiro'
                name='description'
                placeholder='Escreva a descrição do roteiro...'
                className='shadow-md shadow-gray-400 border border-black resize-none max-w-[500px]'
              />

              <ControlledSingleFileInput
                control={form.control}
                disabled={isPending}
                name='imgCover'
                label='Imagem de Capa'
              />

              <Dialog>
                <div className='flex gap-3 items-center'>
                  <div>
                    <CardTitle>Pontos de interesse</CardTitle>
                    <CardDescription>Insira os locais do seu roteiro.</CardDescription>
                  </div>

                  <DialogTrigger asChild className='bg-gradient-to-r from-tl-red to-tl-purple'>
                    <Button size='sm' disabled={isPending}>
                      Inserir
                    </Button>
                  </DialogTrigger>
                </div>
                <div className='flex flex-col gap-3'>
                  {form.getValues().interestPointIds.map((number) => {
                    return (
                      <div className='flex gap-3 w-fit items-center' key={number}>
                        <SelectedInterestPointCard id={number} />
                        <Button
                          className='shadow-md shadow-gray-400 font-bold'
                          onClick={() => {
                            form.setValue(
                              'interestPointIds',
                              form.getValues().interestPointIds.filter((id) => id !== number)
                            );
                          }}
                          variant='destructive'
                          disabled={isPending}
                          type='button'
                        >
                          Remover
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
                        addInterestPoint={addInterestPoint}
                      />
                    </TabsContent>
                    <TabsContent value='experience'>
                      <InterestPointPaginated
                        type='experience'
                        addInterestPoint={addInterestPoint}
                      />
                    </TabsContent>
                    <TabsContent value='hotel'>
                      <InterestPointPaginated type='hotel' addInterestPoint={addInterestPoint} />
                    </TabsContent>
                    <TabsContent value='restaurant'>
                      <InterestPointPaginated
                        type='restaurant'
                        addInterestPoint={addInterestPoint}
                      />
                    </TabsContent>
                    <TabsContent value='event'>
                      <InterestPointPaginated type='event' addInterestPoint={addInterestPoint} />
                    </TabsContent>
                  </Tabs>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant='destructive'>Fechar</Button>
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
