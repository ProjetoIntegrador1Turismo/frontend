'use server';
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Não foi possivel concluir seu cadastro' };
  }

  const { email, name, password } = validatedFields.data;

  const response = await fetch('', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email,
      password: password,
      name: name
    })
  });

  if (!response.ok) {
    //error implementation
  }

  return { success: 'Sucesso! Redirecionando você agora!' };
};
