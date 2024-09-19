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
import { useSession } from 'next-auth/react';
import { updateProfile } from '@/actions/updateProfile';
import { FormError } from '../Auth/form-error';
import { FormSucess } from '../Auth/form-sucess';
import { useRouter } from 'next/navigation';
import ControlledSingleFileInput from '../admin-panel/ControlledSingleFileInput';
import axios from 'axios';
import ReactInputMask from 'react-input-mask';

const ProfileInfo = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [edit, setEdit] = useState<boolean>(false);
  const router = useRouter();
  const { data: SessionData, update: updateSession } = useSession();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: SessionData?.user.firstName + ' ' + SessionData?.user.lastName,
      email: SessionData?.user.email ?? '',
      phone: SessionData?.user.phone
    }
  });

  const onSubmitUpdateProfile = (values: z.infer<typeof UpdateProfileSchema>) => {
    setError('');
    setSuccess('');
    const { avatar, ...updateValues } = values;
    updateProfile(updateValues).then(async (data) => {
      if (data.error) {
        setError(data.error);
        return;
      }
      const nameParts = updateValues.name.trim().split(' ');
      if (avatar) {
        const imgFormData = new FormData();
        imgFormData.append('file', avatar);
        const imageResponse = await axios.post(
          'http://localhost:8081/file/upload/user',
          imgFormData,
          {
            headers: { Authorization: `Bearer ${SessionData?.user.authToken}` }
          }
        );
        if (imageResponse.status === 200) {
          await updateSession({
            ...SessionData,
            user: {
              ...SessionData?.user,
              firstName: nameParts[0],
              lastName: nameParts.slice(1).join(' '),
              profileImageUrl: imageResponse.data,
              phone: updateValues.phone
            }
          });
          setSuccess(data.success);
          setEdit((prevState) => {
            return !prevState;
          });
          router.refresh();
          return;
        }
        if (imageResponse.status !== 200) {
          setError('Erro com a foto de perfil!');
          await updateSession({
            ...SessionData,
            user: {
              ...SessionData?.user,
              firstName: nameParts[0],
              lastName: nameParts.slice(1).join(' '),
              phone: updateValues.phone
            }
          });
          setSuccess(data.success);
          setEdit((prevState) => {
            return !prevState;
          });
          router.refresh();
          return;
        }
      }

      await updateSession({
        ...SessionData,
        user: {
          ...SessionData?.user,
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(' '),
          phone: updateValues.phone
        }
      });

      setSuccess(data.success);
      setEdit((prevState) => {
        return !prevState;
      });
      router.refresh();
      return;
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
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <ReactInputMask
                        mask={'(99) 99999-9999'}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        placeholder='(99) 99999-9999'
                        value={field.value}
                        disabled={!edit}
                      >
                        <Input className='w-[280px] shadow-md shadow-gray-400 border border-black' />
                      </ReactInputMask>
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
                    <div className='text-xs flex items-center space-x-2 text-yellow-600 '>
                      <InfoCircledIcon />
                      <p className='h-1/3 truncate'>Infelizmente, não é possivel mudar o email.</p>
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
                        placeholder='********'
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
              <ControlledSingleFileInput
                control={form.control}
                name='avatar'
                label='Foto de Perfil'
                disabled={!edit}
                className='shadow-md shadow-gray-400 border border-black'
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
        <FormError message={error} />
        <FormSucess message={success} />
      </CardFooter>
    </Card>
  );
};

export default ProfileInfo;
