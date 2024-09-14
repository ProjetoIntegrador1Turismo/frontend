'use server';
import * as z from 'zod';
import { InterestPointFormSchema } from '@/schemas';
import { interestPointCreate } from '@/api/service';

export const createInterestPoint = async (values: z.infer<typeof InterestPointFormSchema>) => {
  const validatedFields = InterestPointFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos invalidos!' };
  }

  const status = await interestPointCreate(validatedFields.data);

  if (!status) {
    return { error: 'Erro ao criar ponto de interesse!' };
  }

  return { success: 'Seu ponto de interesse foi criado com sucesso!' };
};
