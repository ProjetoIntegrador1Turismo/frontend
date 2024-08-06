'use server';
import * as z from 'zod';
import { InterestPointFormSchema } from '@/schemas';
import { interestPointCreate, interestPointUpdate } from '@/api/service';

export const updateInterestPoint = async (values: z.infer<typeof InterestPointFormSchema>, id: string) => {
  const validatedFields = InterestPointFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos invalidos!' };
  }

  const status = await interestPointUpdate(validatedFields.data, id);

  if (!status) {
    return { error: 'Erro ao criar ponto de interesse!' };
    
  }

  return { success: 'Seu ponto de interesse foi criado com sucesso!' };
};
