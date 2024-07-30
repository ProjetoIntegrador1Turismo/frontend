'use server';
import * as z from 'zod';
import { InterestPointFormSchema } from '@/schemas';

export const createInterestPoint = async (values: z.infer<typeof InterestPointFormSchema>) => {
  const validatedFields = InterestPointFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Não foi possivel criar o ponto de interesse!' };
  }

  return { success: 'Sucesso! Seu ponto de interesse foi criado.' };
};
