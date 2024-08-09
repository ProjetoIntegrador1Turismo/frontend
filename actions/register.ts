'use server';
import { RegisterUser } from '@/api/service';
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Não foi possivel concluir seu cadastro' };
  }

  const status = await RegisterUser(validatedFields.data);

  if (status === false) {
    return { error: 'Email já está em uso.' };
  }
  return { success: 'Sucesso! Redirecionando você agora!' };
};
