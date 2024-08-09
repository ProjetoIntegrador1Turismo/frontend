'use server';
import { RegisterGuide } from '@/api/service';
import { RegisterGuideSchema } from '@/schemas';
import * as z from 'zod';

export const registerGuide = async (values: z.infer<typeof RegisterGuideSchema>) => {
  const validatedFields = RegisterGuideSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Não foi possivel concluir seu cadastro' };
  }

  const status = await RegisterGuide(validatedFields.data);

  if (status === false) {
    return { error: 'Email já está em uso.' };
  }

  return { success: 'Sucesso! Redirecionando você agora!' };
};
