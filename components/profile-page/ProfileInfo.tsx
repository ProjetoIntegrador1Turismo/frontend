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
      email: SessionData?.user.email ?? ''
    }
  });
  const fileRef = form.register('avatar');

  const onSubmitUpdateProfile = (values: z.infer<typeof UpdateProfileSchema>) => {
    console.log(values);
    setError('');
    setSuccess('');

    const { avatar, ...updateValues } = values;

    console.log(avatar);

    updateProfile(updateValues).then(async (data) => {
      const imgFormData = new FormData();
      if (data.success) {
        let imageResponse;
        if (avatar) {
          imgFormData.append('file', avatar);
          imageResponse = await axios.post('http://localhost:8081/file/upload/user', imgFormData, {
            headers: { Authorization: `Bearer ${SessionData?.user.authToken}` }
          });
        }
        const nameParts = updateValues.name.trim().split(' ');
        if (imageResponse && imageResponse.status === 200) {
          await updateSession({
            ...SessionData,
            user: {
              ...SessionData?.user,
              firstName: nameParts[0],
              lastName: nameParts.slice(1).join(' '),
              profileImageUrl: imageResponse.data
            }
          });
        }

        if (imageResponse?.status !== 200) {
          setError('Erro com a foto de perfil!');
          await updateSession({
            ...SessionData,
            user: {
              ...SessionData?.user,
              firstName: nameParts[0],
              lastName: nameParts.slice(1).join(' ')
            }
          });
        }
      }
      setSuccess(data.success);
      setError(data.error);
      setEdit((prevState) => {
        return !prevState;
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (data.success) {
        router.refresh();
      }
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
