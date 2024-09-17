'use client';
import { SelectTop3FormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Form } from '../ui/form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Button } from '../ui/button';
import SelectedInterestPointCard from '../guide-panel/SelectedInterestPointCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import InterestPointPaginated from '../guide-panel/InterestPointPaginated';
import { FormError } from '../Auth/form-error';
import { FormSucess } from '../Auth/form-sucess';
import { selectTop3 } from '@/actions/selectTop3';

const SelectTop3Form = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const { toast } = useToast();

  const form = useForm<z.infer<typeof SelectTop3FormSchema>>({
    resolver: zodResolver(SelectTop3FormSchema),
    defaultValues: {
      interestPointIds: []
    }
  });

  const addInterestPoint = (id: number) => {
    if (form.getValues().interestPointIds.includes(id)) {
      toast({
        title: 'Não foi possivel adicionar esse ponto de interesse',
        description: 'Esse ponto de interesse já está selecionado!',
        variant: 'destructive'
      });
      return;
    }
    if (form.getValues().interestPointIds.length === 3) {
      toast({
        title: 'Não foi possivel adicionar esse ponto de interesse',
        description: 'É possivel adicionar apenas 3 pontos de interesse!',
        variant: 'destructive'
      });
      return;
    }
    form.setValue('interestPointIds', [...form.getValues().interestPointIds, id]);
  };

  const onSubmitUpdateTop3 = (values: z.infer<typeof SelectTop3FormSchema>) => {
    startTransition(async () => {
      selectTop3(values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  form.watch();

  return (
    <div className='min-h-[75vh] h-fit mb-3 w-[667px]'>
      <Card>
        <CardHeader>
          <CardTitle>Selecionar Top 3</CardTitle>
          <CardDescription>
            Insira os melhores locais para aparecer na página principal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitUpdateTop3)} className='flex flex-col gap-4'>
              <Dialog>
                <div className='flex gap-3 items-center'>
                  <DialogTrigger asChild className='bg-gradient-to-r from-tl-red to-tl-purple'>
                    <Button size='sm' disabled={isPending} type='button'>
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
                  disabled={form.getValues().interestPointIds.length !== 3 || isPending}
                  className='bg-gradient-to-r from-tl-red to-tl-purple w-fit'
                  type='submit'
                >
                  Atualizar
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

export default SelectTop3Form;
