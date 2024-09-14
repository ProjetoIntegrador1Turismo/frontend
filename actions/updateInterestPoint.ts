'use server';
import * as z from 'zod';
import { InterestPointEditFormSchema } from '@/schemas';
import { interestPointUpdate } from '@/api/service';

export const updateInterestPoint = async (
  values: z.infer<typeof InterestPointEditFormSchema>,
  id: number
) => {
  const validatedFields = InterestPointEditFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos invalidos!' };
  }

  const status = await interestPointUpdate(validatedFields.data, id);

  if (!status) {
    return { error: 'Erro ao editar ponto de interesse!' };
  }

  return { success: 'Seu ponto de interesse foi editado com sucesso!' };
};
