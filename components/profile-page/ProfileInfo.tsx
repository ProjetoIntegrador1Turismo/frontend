'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileSchema } from '@/schemas';

const ProfileInfo = () => {
  const [edit, setEdit] = useState<boolean>(false);

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: 'Denise',
      password: 'japoneise',
      email: 'emailfoda@gmail.com'
    }
  });

  const fileRef = form.register('avatar');

  const onSubmitUpdateProfile = (values: z.infer<typeof UpdateProfileSchema>) => {
    console.log(values);
    setEdit((prevState) => {
      return !prevState;
    });
  };

  return (
    <Card className='w-fit'>
      <CardHeader>
        <CardTitle>Seus dados</CardTitle>
        <CardDescription>Edite-os quando quiser.</CardDescription>
      </CardHeader>
      <CardContent className='w-[800px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitUpdateProfile)} className='flex gap-4'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!edit}
                        {...field}
                        type='text'
                        className='shadow-md shadow-gray-400 border border-black'
                      />
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
                      <Input
                        disabled
                        {...field}
                        type='text'
                        className='shadow-md shadow-gray-400 border border-black'
                      />
                    </FormControl>
                    <div className='text-xs flex items-center space-x-2 text-yellow-600'>
                      <InfoCircledIcon />
                      <p>Infelizmente, não é possivel mudar o email.</p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!edit}
                        {...field}
                        type='password'
                        className='shadow-md shadow-gray-400 border border-black'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='avatar'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto de Perfil</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!edit}
                        type='file'
                        accept='image/*'
                        {...fileRef}
                        onChange={(event) => {
                          field.onChange(event.target?.files?.[0] ?? undefined);
                        }}
                        className='shadow-md shadow-gray-400 border border-black'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {edit && (
              <Button
                className='bg-gradient-to-r from-tl-red to-tl-purple self-center'
                type='submit'
              >
                Atualizar
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex flex-col gap-4 items-center'>
          <Label htmlFor='edit'>Editar dados</Label>
          <Switch
            id='edit'
            className='shadow-md shadow-gray-400'
            checked={edit}
            onCheckedChange={() => {
              setEdit((prevState) => {
                return !prevState;
              });
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfileInfo;
